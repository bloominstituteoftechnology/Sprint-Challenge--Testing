const mongoose = require('mongoose');
const request = require('supertest');

const server = require('./server');
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

  let gameId, game;

  beforeEach(async () => {
    game = {title: 'testgame', genre: 'test', releaseDate: 'never'};
    const bigGame = await Game.create(game);
    gameId = bigGame._id;
  });

  afterEach(() => {
    return Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here
  it('POST', async () => {
    const response = await request(server).post('/api/games').send(game);

    expect(response.status).toEqual(201);
    expect(response.type).toEqual('application/json');
    expect(response.body.title).toEqual('testgame');
  });

  // test the GET here

  // Test the DELETE here
});
