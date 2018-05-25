const mongoose = require('mongoose');
const server = require('./server.js');
const request = require('supertest');
const Game = require('./games/Game');

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

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const prototypeGame = new Game({
      title: 'Starfox',
      genre: 'SNES',
      releaseDate: 'March 1993',
    });
    prototypeGame.save((err, saved) => {
      gameId = prototypeGame._id;
    });
  });

  afterEach(() => {
    //   // clear collection.
    Game.remove()
  });

  it('runs the tests', () => {});

  // test the POST here
  it('should respond to a post', async () => {
    const game = { title: 'title', genre: 'genre', releaseDate: 'releaseDate' }
    const response = await request(server).post('/api/games').send(game)
    expect(response.status).toBe(201)
    expect(response.type).toBe('application/json')
    expect(response.body.title).toMatch('title')
  });

  // test the GET here

  // Test the DELETE here
});
