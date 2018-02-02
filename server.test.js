const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const chaiHTTP = require('chai-http');
const sinon = require('sinon');

chai.use(chaiHTTP);

const Game = require('./models');
const server = require('./server');

describe('Games', () => {
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
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  let testGame = new Game ({
    title: 'Five Nights at Freddys',
    genre: 'Horror', 
    releaseDate: 'yesterday'
  });

  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    testGame
      .save((error, savedGame) => {
        if (error) {
          console.log(error);
          done(error);
        }
        done();
      });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game
      .remove({}, error => {
        if (error) {
          console.log(error);
        }
        done();
      });
  });

  // test the POST here
  describe('POST /api/games/create', () => {
    it('should return an error code 422 and message if data is invalid', () => {
      const newGame = new Game ({
        title: 'cheese',
        genre: 'food',
        releaseDate: 'tomorrow'
      });
      chai.request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((error, addedGame) => {
          if (error) return console.log(error);
          expect(addedGame.title).to.equal('cheese');
          done();
        });
    });
    it('should return a game if correctly added to the database', () => {
      expect(3+4).to.equal(17);
    });
  });

  // test the GET here
  describe('GET /api/games/get', () => {});

  // test the PUT here
  describe('PUT /api/games/update', () => {});

  // --- Stretch Problem ---
  // Test the DELETE here
  describe('DELETE /api/games/destroy/:id', () => {});
});
