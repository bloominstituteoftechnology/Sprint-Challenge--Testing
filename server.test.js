const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const { assert } = chai;
const sinon = require('sinon');
const chaiHTTP = require('chai-http');

const Game = require('./models');

const server = require('./server');
chai.use(chaiHTTP);

describe('Games', () => {
  before(done => {
    let gameId = null;
    let gameName = null;
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
    const newGame = new Game({
      title: 'Half Life 2',
      releaseDate: 'November 2004',
      genre: 'First Person Shooter'
    });
    newGame
      .save()
      .then(game => {
        gameName = game;
        gameId = game._id;
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });
  afterEach((done) => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  // test the POST here
  describe('[Post] /api/game/create', () => {
    it('should post to database', done => {
      const newGame = new Game({
        title: 'Portal',
        date: 'July 2004',
        genre: 'Puzzle'
      });
      chai
        .request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          if(err) {
            return console.log(err)
            done();
          }
          assert.equal(res.body.title, 'Portal');
          done();
        })
    })
  })
  // test the GET here

  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
