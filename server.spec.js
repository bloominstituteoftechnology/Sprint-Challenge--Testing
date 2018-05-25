const mongoose = require('mongoose');
const server = require('./server');
const Game = require('./games/Game');
const r = require('supertest');

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
    const game = {"title": "hello world", "genre": "fantasy"};
    const savedGame = await Game.create(game);
    gameId = savedGame._id;

  });

  afterEach(() => {
    //   // clear collection.
    return Game.remove();
  });
  // test the POST here
  it('runs the tests', () => {});
  describe('post', () => {
    it ('should create a new game document within the games collection', async () => {
      const response = await r(server).post('/api/games').send({"title": "hello", "genre": "sports", "releaseDate": Date.now()})
      expect(response.status).toBe(201)
    })
    it ('should accept a second game document', async () => {
      const response = await r(server).post('/api/games').send({"title": "this title", "genre": "hardcore", "releaseDate": "idk"})
      expect(response.body.title).toBe('this title');
    })
  })

  // test the GET here
  describe('get', () => {
    it ('should return the list of games', async () => {
      const response = await r(server).get('/api/games');
      expect(response.body[0].title).toEqual('hello world')
    })
    it ('should return the list of games', async () => {
      const response = await r(server).get('/api/games');
      expect(response.body[0].title).toEqual('hello world')
    })
  })
  // Test the DELETE here
  describe('delete', () => {
    it ('should delete a document', async () => {
      const response = await r(server).delete(`/api/games/${gameId}`);
      expect(response.status).toEqual(204);
    })
    it ('should return a 500 because the id doesnt exist', async () => {
      const response = await r(server).delete(`/api/games/123as`);
      expect(response.status).toEqual(500);
    })
    it ('should return a 404 because of a missing id', async () => {
      const response = await r(server).delete(`/api/games/`);
      expect(response.status).toEqual(404);
    })
  })
  describe('put', () => {
    it ('should update my document', async () => {
      const response = await r(server).put(`/api/games/${gameId}`).send({"title": "updated title!"})
      expect(response.body.title).toEqual('updated title!')
    })
  })
});
