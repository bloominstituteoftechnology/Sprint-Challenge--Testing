const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Game = require('./models');

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
    it('should return an error if data is invalid', () => {
      expect(1+2).to.equal(5);
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
