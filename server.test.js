const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');

const Game = require('./models');

describe('Games', () => {
  let gameId;
  let newGame;
  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: 'Contra',
      genre: 'Shoot em up',
      releaseDate: 'February 1981',
    });
    newGame
      .save()
      .then(savedGame => {
        gameId = savedGame._id;
      })
      .catch(err => {
        console.error(err);
      });
    done();
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) {
        console.log(err);
        return done();
      }
    });
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should create a new game', done => {
      return chai
        .request(server)
        .post('/api/game/create')
        .send({
          title: 'Balloon Fight',
          genre: 'Action Game',
          releaseDate: 'November 1984',
        })
        .then(response => {
          console.log(req.body.title);
          done();
        })
        .catch(error => {
          throw error;
        });
      done();
    });
    it.skip(`'Should fail if name, genre, or releaseDate aren't provided`, () => {});
  });
  // test the GET here

  // Test the DELETE here

  // --- Stretch Problem ---
  // test the PUT here
});
