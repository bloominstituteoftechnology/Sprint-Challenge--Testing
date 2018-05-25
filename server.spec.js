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
  
  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks

  });

  afterEach(() => {
    //   // clear collection.
  });

  it('runs the tests', () => {});

  // test the POST here
  it('should verify the info is sent to the database' , async () => {
    const game = {genre: 'Action', title: 'SuperCops!', releaseDate: '04-23-1990'}
    const savedGame = await Game.create(game); // new + save

    expect(savedGame.title).toEqual('SuperCops!');
    expect(savedGame.title).not.toEqual('Tommys Train Adventure!');
    expect(savedGame.title).not.toEqual(456);

  })

  // test the GET here

  // Test the DELETE here
});
