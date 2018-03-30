const mongoose = require('mongoose');
const chai = require('chai');
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
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
  });
  afterEach(done => {
    // simply remove the collections from your DB.
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it ('should return the newly added game', (done) => {
      const game = {
        name: 'Pro Wrestling',
        genre: 'Fighting/Sports',
        date: 'March 1987'
      };

      chai.request(server)
        .post('/api/game/create')
        .send(game)
        .end((err, res) => {
          if (err) {
            console.error(err);
            return done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('Pro Wrestling');
          done();
        });
    });
  });

  // test the GET here

  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
