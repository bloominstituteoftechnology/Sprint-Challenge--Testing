const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');
const Game = require('./models');
const chaiHTTP = require('chai-http');
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
      title: 'myGame',
      genre: 'rpg',
      releaseDate: '2xxx'
    });
    newGame.save((err, savedGame) => {
      if (err) {
        console.log('Error at beforeEach hook..');
        done();
      } else {
        gameId = savedGame._id.toString();
        done();
      }
    });
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
  });
  afterEach(done => {
    Game.remove({}, err => {
      if (err) {
        console.log('Error at afterEach hook..');
      }
      done();
    });
    // simply remove the collections from your DB.
  });
  describe('[POST] /api/game/create..', () => {
    it('should save a doc to db..', done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({ title: 'theGame', genre: 'rpg', releaseDate: '2xxx' })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  // test the POST here

  describe('[GET] /api/game/get..', () => {
    it('should display list of games', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.be.a('array');
          done();
        });
    });
  });
  // test the GET here

  describe('[DELETE] /api/game/destroy/:id', () => {});
  // Test the DELETE here

  // --- Stretch Problem ---
  // test the PUT here
});
