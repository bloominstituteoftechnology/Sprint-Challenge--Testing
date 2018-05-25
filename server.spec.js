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

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: 'Ratchet and Clank - Tools of Destruction',
      genre: 'platformer',
      releaseDate: '11/23/2007'
    });
    console.log('game has been ran through before each');
  });

  afterEach(() => {
    //   // clear collection.
    Game.remove;
    console.log('game has been cleared');
  });

  it('runs the tests', () => {});

  // test the POST here

  // test the GET here

  // Test the DELETE here
});
