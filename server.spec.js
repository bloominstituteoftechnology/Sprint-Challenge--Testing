const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server');

const Game = require('./games/Game');
const faker = require('faker');

describe('Games', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='));
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach( async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const testGameData = {
      title: faker.random.word(),
      genre: faker.random.word(),
      releaseDate: faker.date.recent().toLocaleDateString('en-US')
    };

    const testGame = await new Game(testGameData).save();
    gameId = testGame._id;
  });

  afterEach(() => {
    return Game.remove();
  });

  describe('POST /api/games', () => {
    it('should create a new game', async () => {
      const testGameData = {
        title: faker.random.word(),
        genre: faker.random.word(),
        releaseDate: faker.date.recent().toLocaleDateString('en-US')
      };

      const response = await request(server)
        .post('/api/games')
        .send(testGameData);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(testGameData);

    });
  });

  describe('GET /api/games', () => {
    it('should get list of games', async () => {

      const response = await request(server).get('/api/games');

      expect(response.status).toBe(200);
      expect(response.body[0]._id).toBe(String(gameId));
    });
  });

  // test the GET here

  // Test the DELETE here
});
