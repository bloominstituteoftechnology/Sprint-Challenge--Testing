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
  beforeEach(done => {

    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
  });
  afterEach(done => {
    // simply remove the collections from your DB.
  });
  
  // test the POST here
  describe('[POST] /api/models',() => {
    it('should create a title, a release date, and a genre of a game')
  })
  // test the GET here
describe('[GET] /api/models',() => {
    it ('should get a list of all games in db'), done=> {
  //  .request(server)
   // .get('/api/models')
    if (err) {
      console.log(err);
      return done();
    }
   // const {_id.to equal(gameId)}
    }

  })
  // Test the DELETE here
  
  // --- Stretch Problem ---
  // test the PUT here
});
