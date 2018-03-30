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
  
  let id = null;
  let game = null;

  beforeEach(done => {
    const newGame = new Game({
      title: 'Duck Hunt',
      genre: 'light gun shooter',
      releaseDate: '21 April 1984',
    });
    newGame.save((error, saved) => {
      if (error) {
        console.error(err);
        return done();
      }
      id = saved._id;
      game = saved;
      done();
    });
  });

  afterEach(done => {
    Game.remove({}, (error, removed) => {
      if (error) {
        console.error(err);
        return done();
      }
      done();
    });
  });

  describe('POST /api/game/create', () => {
    it('should add a new game', (done) => {
      const postGame = new Game({
        title: 'California Games',
        genre: 'Sports',
        releaseDate: 'June 1987',
      });
      chai
        .request(server)
        .post('/api/game/create')
        .send(postGame)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('California Games')
          done();
        });
    });
  });

  // test the GET here

  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
