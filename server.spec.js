const mongoose = require('mongoose');
const request = require('supertest');
const Game = require('./games/Game');

describe('Games', () => {
  beforeAll(async () => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='));
  });

  afterAll(async () => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(done => {
    const newGame = new Game({
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987',
    }); 
    newGame
    .save()
    .then(savedGame => {
      gameId = savedGame._id.toString();
    })
    .catch(err => {
      console.log(err);
    });
    done();
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    
  });

  afterEach(done => {
    Game.remove({}, err => {
      if (err) console.log(err);
      return done();
    })
    //   // clear collection.
  });

  it('runs the tests', () => {});

  // test the POST here
  describe('[POST] /api/games', () => {
    it('should save a document to the db', done => {
      .request(server)

    })
  })

  // test the GET here

  // Test the DELETE here
});
