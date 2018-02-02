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
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    beforeEach(() => {
      return db.clear()
        .then(function () {
          return db.save([tobi, loki, jane]);
        });
    });
    beforeEach(function () {
      banana = new Banana();
    });

  });
  afterEach(done => {
    // simply remove the collections from your DB.
  });

  // test the POST here
  server.post

  // test the GET here
  server.get

  // test the PUT here
  server.put

  // --- Stretch Problem ---
  // Test the DELETE here
  server.delete
});
