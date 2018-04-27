const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const Game = require('./models');
const server = require('./server');

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
    const newGame = new Game({
      title: 'Game',
      genre: 'RPG',
      releaseDate: 'yes',
    });
    newGame
      .save()
      .then(savedGame => {
        gameId = savedGame._id;
      })
      .catch(err => {
        console.log(err);
      });
    done();
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log(err);
      return done();
    });
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should save the information to the database', done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({
          title: 'Game',
          genre: 'RPG',
          releaseDate: 'yes',
        })
        .then(response => {
          done();
        })
        .catch(err => {
          throw err;
        });
    });
    it('Should fail if bad information is provided', done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({ data: 'bad' })
        .then(response => {
          console.log(response.body.errors);
        })
        .catch(err => {
          throw err;
        });
    });
  });

  // test the GET here

  // Test the DELETE here

  // --- Stretch Problem ---
  // test the PUT here
});
