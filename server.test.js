const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

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

  let videoGame = null;
  let testVideoGame = null;
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks

    const newGame = new Game({
      title: 'The Legend of Zelda',
      genre: 'Adventure',
      releaseDate: 'February 21, 1986',
    });
    newGame
      .save()
      .then(game => {
        testVideoGame = game;
        videoGame = game._id;
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });
  afterEach(done => {
    // simply remove the collections from your DB.

    Game.remove({}, err => {
      if (err) console.error(err);
      done();
    });
  });

  // test the POST here

  describe(`[POST] /api/game/create`, () => {
    it('should add a new video game', done => {
      const newGame = {
        title: 'The Legend of Zelda',
        genre: 'Adventure',
        releaseDate: 'February 21, 1986',
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(newGame),
        end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('The Legend of Zelda');
          done();
        });
    });
    it('should return error status 422', done => {
      const newGame = {
        title: 'The Legend of Zelda',
        genre: 'Adventure',
        releaseDate: 'February 21, 1986',
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          if (err) {
            expect(err.status).to.equal(422);
            const { error } = err.response.body;
            expect(error).to.equal('Invalid data');
            done();
          }
        });
    });

    // test the GET here

    // test the PUT here

    // --- Stretch Problem ---
    // Test the DELETE here
  });
});
