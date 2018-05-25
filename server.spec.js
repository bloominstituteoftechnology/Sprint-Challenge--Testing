const mongoose = require('mongoose');

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
    game = await Game.create({title: 'testgame', genre: 'test', releaseDate: 'never'});
    gameId = game._id;
  });

  afterEach(() => {
    return Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here

  // test the GET here

  // Test the DELETE here
});
