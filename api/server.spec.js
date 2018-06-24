const mongoose = require('mongoose');
const Game = require('../games/Game');
const server = require('./server');
const request = require('supertest');

describe('The API Server', () => {
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

  let gameId;

  beforeEach(async () => {
    const californiaGames = {
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    };

    const game = await Game.create(californiaGames);
    gameId = game._id;
  });

  afterEach(() => {
    return Game.remove();
  });

  describe('POST to /api/games', () => {
    it('returns status code 201 when a new game is added to the db', async () => {
      const mineCraft = {
        title: 'Minecraft',
        genre: 'sandbox',
        releaseDate: 'May 2009'
      };

      const response = await request(server)
        .post('/api/games')
        .send(mineCraft);
      
      expect(response.status).toBe(201)
    });

    it('returns a game object with an id, title, genre, and releaseDate', async () => {
      const WoW = {
        title: 'World of Warcraft',
        genre: 'MMORPG',
        releaseDate: 'November 2004'
      };

      const response = await request(server)
        .post('/api/games')
        .send(WoW);

      expect(response.body._id).toBeTruthy();
      expect(response.body.title).toBe('World of Warcraft');
      expect(response.body.genre).toBe('MMORPG');
      expect(response.body.releaseDate).toBe('November 2004');
    })
  });

  describe('GET to /api/games', () => {
    it('returns a list of games', async () => {
      const games = await request(server).get('/api/games');

      expect(Array.isArray(games.body)).toBeTruthy();
    })

    it('returns status code 200 when games are retrieved', async () => {
      const games = await request(server).get('/api/games');

      expect(games.status).toEqual(200);
    })

    it('returns status code 404 when route does not exist', async () => {
      const games = await request(server).get('/api/games/1');

      expect(games.status).toEqual(404);
    })
  })

  // Test the DELETE here
});
