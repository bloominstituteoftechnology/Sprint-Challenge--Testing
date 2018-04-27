const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http')
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
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
  let gameId;
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {

    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game ({
      title: 'One Piece',
      genre: 'Adventure Game',
      releaseDate: 'September 7, 2005'
    });
  
  });
  afterEach(done => {
    // simply remove the collections from your DB.
  });

  // test the POST here

  // test the GET here

  // Test the DELETE here
  
  // --- Stretch Problem ---
  // test the PUT here
});
