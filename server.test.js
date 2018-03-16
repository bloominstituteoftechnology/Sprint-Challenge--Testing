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
  let testGame1, testGame2 = null;
  let testGame1_id, testGame2_id = null;

  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const game1 = new Game({
      title: 'Superbowl',
      genre: 'Sports',
      date: 'February 2018'
    });
    const game2 = new Game({
      title: 'Monopoly',
      genre: 'Board Game',
      date: 'January 1902'
    });
    game1.save()
      .then(game => {
        testGame1 = game;
        testGame1_id = game._id;
      })
      .catch(err => {
        console.error('Error saving game1');
      });
    game2.save()
      .then(game => {
        testGame2 = game;
        testGame2_id = game._id;
      })
      .catch(err => {
        console.error('Error saving game2');
      });
      done();
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.error('Error removing test data');
    });
    done();
  });

  // test the POST here

  // test the GET here

  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
