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

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(async () => {
    const newGame = { title: 'messing with mongoose', genre: 'sci-fi', releaseDate: '3141' }
    const savedGame = await Game.create(newGame);
  });

  afterEach(() => {
    //   // clear collection.
  });

  it('runs the tests', () => {});

  // test the POST here

  // test the GET here

  // Test the DELETE here
});
