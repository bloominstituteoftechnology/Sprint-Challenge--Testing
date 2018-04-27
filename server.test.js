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
  let gameId;
  // hint - these wont be constants because you'll need to override them.
  beforeEach(() => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      name: 'Radiohead',
      genre: 'Alt-rock'
    });
    return newGame
      .save()
      .then(savedGame => {
        gameId = savedGame._id.toString();
      })
      .catch(err => {
        console.log(err);
      });
  });

  afterEach(() => {
    // simply remove the collections from your DB.
    return Game.remove({}, err => {
      if (err) console.log(err);
    });
  });

  // test the POST here

  // test the GET here

  // Test the DELETE here

  // --- Stretch Problem ---
  // test the PUT here
});
