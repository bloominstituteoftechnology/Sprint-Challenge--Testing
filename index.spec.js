const mongoose = require('mongoose');
const Game = require('./games/Game');
const request = require('supertest');
const server = require('./api/server');

describe.only('The API Server', () => {
  let mario = {};
  let gameId;

  beforeAll(() => {
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
    mario = Object.assign({}, mario, {
      title: 'Mario Bros.',
      genre: 'Platform',
      releaseDate: 'June 1986'
    });
    return Game.create(mario);
  });

  afterEach(() => {
    return Game.remove();
  });

  describe('POST endpoint to /api/games', () => {
    const zelda = {
      title: 'The Legend of Zelda',
      genre: 'Action-Adventure',
      releaseDate: 'August 1987'
    };

    it('should save a game', async () => {
      const response = await request(server)
        .post('/api/games')
        .send(zelda);
      const savedGame = await Game.find({ title: zelda.title });

      expect(savedGame.length).toBe(1);
    });

    it('should return Created status code and a JSON object with the saved game', async () => {
      const expected = {
        status: 201,
        type: 'application/json',
        body: zelda
      };
      const response = await request(server)
        .post('/api/games')
        .send(zelda);
      
      expect(response.status).toBe(expected.status);
      expect(response.type).toBe(expected.type);
      expect(response.body).toMatchObject(expected.body);
    });
  });

  describe('GET request to /api/games', () => {
    it('should return OK status code and a JSON object with an array of all saved games', async () => {
      const zelda = {
        title: 'The Legend of Zelda',
        genre: 'Action-Adventure',
        releaseDate: 'August 1987'
      };
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

  describe('DELETE endpoint to /api/games', () => {});
});
