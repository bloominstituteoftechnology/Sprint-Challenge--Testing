const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const server = require('./server');
const sinon = require('sinon');

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
  let gameId;
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    const newGame = new Game({
      title: 'Skyrim',
      genre: 'RPG',
      releaseDate: 'June 2011'
    });
    newGame
      .save()
      .then(savedGame => {
        gameId = savedGame._id.toString();
      })
      .catch(err => {
        console.log(err);
      });
    done();
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log(err);
      return done();
    });
  });

  // test the POST here
  describe(`[POST] /api/game/create`, () => {
    it('should save a game to the db', done => {
      chai
        .request(server)
        .post('/api/game')
        .send({ title: 'Skyrim', genre: 'RPG', date: 'June 2011' })
        .then(response => {
          // is res.body.length === 2?
          // console.log(response.body);
          done();
        })
        .catch(err => {
          throw err;
        });
    });
    it(`Should fail if title or genre aren't provided`, () => {
      return chai
        .request(server)
        .post('/api/game')
        .send({ poo: 'sry' })
        .then(res => {
          const genreMessage = res.body.errors.genre.message;
          const titleMessage = res.body.errors.title.message;
          expect(res.status).to.equal(422);
          expect(genreMessage).to.equal('Path `genre` is required.');
          expect(titleMessage).to.equal('Path `title` is required.');
        });
    });
  });
  // test the GET here
  describe(`[GET] /api/game/get`, () => {
    it('should get a list of all the games in db', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .then(response => {
          const { _id, title, genre } = response.body[0];
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('array');
          expect(_id).to.equal(gameId);
          expect(title).to.equal('Skyrim');
          done();
        })
        .catch(err => {
          throw err;
        });
    });
    it.skip('Should fail if bad URL is provided', () => { });
  });
  // Test the DELETE here

  // --- Stretch Problem ---
  // test the PUT here
});
