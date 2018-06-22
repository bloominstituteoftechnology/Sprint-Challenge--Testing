const mongoose = require('mongoose');
const request = require('supertest');
const Game = require('../games/Game');
const server = require('./server');

describe('The API Server', () => {
  let mario = {};
  let zelda = {};
  let gameId;

  beforeAll(() => {
    mario = Object.assign({}, mario, {
      title: 'Mario Bros.',
      genre: 'Platform',
      releaseDate: 'June 1986'
    });

    zelda = Object.assign({}, mario, {
      title: 'The Legend of Zelda',
      genre: 'Action-Adventure',
      releaseDate: 'August 1987'
    });

    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  beforeEach(() => {
    return Game.create(mario).then(game => {
      gameId = game._id;
    });
  });

  afterEach(() => {
    return Game.remove();
  });

  describe.only('POST endpoint to /api/games', () => {
    it('should save a game and return Created status code and JSON object with saved game', async () => {
      const expected = {
        status: 201,
        type: 'application/json',
        body: zelda,
        savedGames: 2
      };
      const response = await request(server)
        .post('/api/games')
        .send(zelda);
      const savedGames = await Game.find();

      expect(response.status).toBe(expected.status);
      expect(response.type).toBe(expected.type);
      expect(response.body).toMatchObject(expected.body);
      expect(savedGames.length).toBe(expected.savedGames);
    });

    it('should not save game if request is missing title and returns Internal Server Error status code and JSON error message', async () => {
      const expected = {
        status: 500,
        type: 'application/json',
        body: { message: 'Error saving data to the DB' },
        savedGames: 1
      };
      const response = await request(server)
        .post('/api/games')
        .send({
          genre: 'Action-Adventure',
          releaseDate: 'August 1987'
        });
      const savedGames = await Game.find();

      expect(response.status).toBe(expected.status);
      expect(response.type).toBe(expected.type);
      expect(response.body).toMatchObject(expected.body);
      expect(savedGames.length).toBe(expected.savedGames);
    });

    it('should not save game if request is missing genre and returns Internal Server Error status code and JSON error message', async () => {
      const expected = {
        status: 500,
        type: 'application/json',
        body: { message: 'Error saving data to the DB' },
        savedGames: 1
      };
      const response = await request(server)
        .post('/api/games')
        .send({
          title: 'The Legend of Zelda',
          releaseDate: 'August 1987'
        });
      const savedGames = await Game.find();

      expect(response.status).toBe(expected.status);
      expect(response.type).toBe(expected.type);
      expect(response.body).toMatchObject(expected.body);
      expect(savedGames.length).toBe(expected.savedGames);
    });
  });

  describe('GET request to /api/games', () => {
    it('should return OK status code and a JSON object with an array of all saved games', async () => {
      const expected = {
        status: 200,
        type: 'application/json',
        numGames: 2
      };
      const savedGame = await Game.create(zelda);
      const response = await request(server).get('/api/games');

      expect(response.body.length).toBe(expected.numGames);
    });
  });

  describe('DELETE endpoint to /api/games/:id', () => {
    it('should delete game matching given id and return No Content status code', async () => {
      const expected = {
        status: 204,
        foundGame: 0
      };
      const response = await request(server).delete(`/api/games/${gameId}`);
      const foundGame = await Game.find({ _id: gameId });

      expect(response.status).toBe(expected.status);
      expect(foundGame.length).toBe(expected.foundGame);
    });

    it('should return Internal Server Error status code and JSON error message if request is made with invalid id', async () => {
      const expected = {
        status: 500,
        type: 'application/json'
      };
      const invalidId = '2';
      const response = await request(server).delete(`/api/games/${invalidId}`);

      expect(response.status).toBe(expected.status);
      expect(response.type).toBe(expected.type);
    });

    it('should return Not Found status code and JSON error message if game to delete cannot be found', async () => {
      const expected = {
        status: 404,
        type: 'application/json',
        body: { message: 'Game not found' }
      };
      const deletedGame = await request(server).delete(`/api/games/${gameId}`);
      const response = await request(server).delete(`/api/games/${gameId}`);

      expect(response.status).toBe(expected.status);
      expect(response.type).toBe(expected.type);
      expect(response.body).toMatchObject(expected.body);
    });
  });
});
