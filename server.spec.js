const server = require("./server");
const mongoose = require('mongoose');
const request = require('supertest');
const Game = require('./games/Game');

describe('Games', () => {
  const newGame = { title: 'Mario', genre: 'Action', releaseDate: '091385'};
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

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() => {
    return Game.remove();// clear collection.
  });

  it('runs the tests', () => {});

  // test the POST here
  it('Tests for POSTs to `/api/games`', async () => {
    const response = await request(server).post('/api/games').send(newGame)

    expect(response.status).toBe(201)
    expect(response.type).toBe('application/json')
  })
  it('Tests that a user can POST a game without a release date', async () => {
    const missingReleaseDate = { title: 'Mario', genre: 'Action'};
    const response = await request(server)
      .post('/api/games')
      .send(missingReleaseDate)
      expect(response.status).toBe(201)
      expect(response.type).toBe('application/json')
  });
  // test the GET here
  it("GET test should fetch game DB", () => {
    request(server)
    .get('/api/games')
    .expect(200)
    .expect(response => response.length === 0)
  });
  it('Tests GET fetch for one with game ID', async() => {
    const savedGame = await Game.create(newGame);
    request(server)
      .get(`/api/games/${savedGame._id}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => res.body.title === newGame.title)
      .expect(res => res.body.genre === newGame.genre)
      .expect(res => res.body.releaseDate === newGame.releaseDate)
  });
  // Test the DELETE here
  it('Tests DELETE for existing game if the ID is provided', async() => {
    const savedGame = await Game.create(newGame);
    request(server)
      .delete(`/api/games/${savedGame._id}`)
      .expect(204) // game exists and has been removed-status code No Content 
  });
  it('Tests DELETE returns error if an invalid ID is provided', async() => {
    request(server)
    .delete('/api/game/9999')
    .expect('Content-Type', /json/)
    .expect(response => response.message === 'Game not found')
    .expect(404)
});
});
