const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server');

const Game = require('./games/Game');
const faker = require('faker');

describe('Games', () => {
  let gameId;

  async function createTest() {
    const testGameData = {
      title: faker.random.word(),
      genre: faker.random.word(),
      releaseDate: faker.date.recent().toLocaleDateString('en-US')
    };

    const testGame = await new Game(testGameData).save();
    gameId = testGame._id;
  }

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


  beforeEach( async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    return createTest();
  });

  afterEach(() => {
    return Game.remove();
  });

  describe('POST /api/games', () => {
    it('should create a new game with correct data', async () => {
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

    it('should return error if title is missing', async () => {
      const testGameData = {
        genre: faker.random.word(),
        releaseDate: faker.date.recent().toLocaleDateString('en-US')
      };

      const response = await request(server)
        .post('/api/games')
        .send(testGameData);

      expect(response.status).toBe(500);
      expect(response.body.error._message).toBe("Game validation failed");
    });
  });

  describe('GET /api/games', () => {
    it('should get correct games', async () => {

      const response = await request(server).get('/api/games');

      expect(response.status).toBe(200);
      expect(response.body[0]._id).toBe(String(gameId));
    });

    it('should get list of games', async () => {
      createTest();

      const response = await request(server).get('/api/games');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });
  });

  describe('Delete /api/games/:id', () => {
    it('should delete a game by id', async () => {

      const response = await request(server).delete(`/api/games/${gameId}`);

      expect(response.status).toBe(204);
    });

    it('should return error for nonexistent id', async () => {

      const response = await request(server).delete('/api/games/41224d776a326fb40f000001');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Game not found");
    });
  });
});
