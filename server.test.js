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
  
  const gameTest = {
    title: 'California Games', genra: 'spoorts', date:'june 1987'
  }
  const gamePostTest = {
    title: 'Name That Game', genra: 'trivia', date:'december 2017'
  }
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    const newGame = new Game(gameTest)
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    newGame
      .save()
      .catch(error => console.log('Error Saving To Database'));
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    db.collection.games.drop(() => done())
  });

  // test the POST here
  describe('/POST add a new game to the database', () => {
    it('should add a game to the database', (done) => {
      chai.request(db)
        .post('/api/game/create')
        .send({gamePostTest
        })
        .end((error, response) => {
          if (error) done(error);

      })
    })
  })


  // test the GET here
  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
