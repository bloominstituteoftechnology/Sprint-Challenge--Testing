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
    const newGame = new Game({
      title: "Counter Strike",
      genre: "pif-paf",
      releaseDate: "late 2000s", 
    });
    
    Game.create(newGame)
    .then(savedGame => {
      gameId = savedGame._id.toString();
      console.log(savedGame);
    })
    .catch(err => console.log(err));
  
  });

  afterEach(() => {
    //   // clear collection.
    console.log(gameId);
    return Game.remove({});
  });

  it('runs the tests', () => {});

  // test the POST here

  // test the GET here

  // Test the DELETE here
});
