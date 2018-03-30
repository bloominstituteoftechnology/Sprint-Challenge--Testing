const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');

const Game = require('./models');

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

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  
  
  let gameId;
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    new Game({ 
      title: 'Diablo 3',
      genre: 'Fail',
      releaseDate: 'March 30, 1900'
    })
    .save((err, saveGame) => {
      if (err) {
        console.log('There was an error saving game');
        done();
        return;
      } else {
        gameId = savedGame.id; 
        console.log('Game has been saved');
        done();
      }
    })
  });

  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if(err) console.log('there was an error removing collections from DB')
      done();
    });
  });

  // test the POST here

  

  // test the GET here

  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
