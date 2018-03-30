const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');

const { expect } = chai;
const sinon = require('sinon');

const Game = require('./models');
chai.use(chaihttp);

describe('Games', () => {
  before(done => {
    console.log('running `before` method');
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
    console.log('running `after` method');
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });
  let firstGameId;
  let secondGameId;
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    console.log('running `beforeEach` method')
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    new Game({
      name: 'The Rest Of Us',
      genre: 'Zombie',
      releaseDate: 'June 2011',
    }).save((err, saved) => {
      if (err) {
        console.log(err);
        return done();
      }
      firstGameId = saved._id;
      done();
    });
    new Game({
      name: 'Madden NFL 2027',
      genre: 'Sports'
    }).save((err, saved) => {
      if (err) {
        console.log(err);
        return done();
      }
      secondGameId = saved._id;
      done();;
    });
  });
  afterEach(done => {
    console.log('running `afterEach` method');
    // simply remove the collections from your DB.
      Game.remove({}, err => {
        if (err) console.error(err);
      done();
      });
    });


  // test the POST here

  // test the GET here

  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
