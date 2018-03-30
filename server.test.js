const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const Game = require('./models');
const server = require('./server');
chai.use(chaiHTTP);
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

  let gameID = null;

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    const newGame = new Game({
      title: 'Counter Strike',
      genre: 'First Person Shooter'
    });
    newGame
      .save()
      .then(game => {
        testGame = game;
        gameID = game._id;
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, error => {
      if (error) console.error(error);
      done();
    });
  });

  // test the POST here

  // test the GET here

  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
