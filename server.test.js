const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

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

  let gameId;

  beforeEach((done) => {
    new Game({
      title: 'Mega Man',
      releaseDate: 'December 17, 1987',
      genre: 'Action Platformer'
    }).save((err, savedGame) => {
      if (err) {
        console.log(err);
        return done();
      }
      gameId = savedGame.id;
      done();
    });
  });

  afterEach((done) => {
    Game.remove({}, (err) => {
      if (err) {
        console.log(err);
        return done();
      };
      mongoose.connection.db.dropDatabase();
      done();
    });
  });

  describe('[POST] /api/game/create', () => {
    it('should add a new game', (done) => {
      const game = {
        title: 'Contra',
        releaseDate: 'February 20, 1987',
        genre: 'Run and gun'
      };

      chai.request(server)
        .post('/api/game/create')
        .send(game)
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Contra');
          done();
        });
    });
  });

  describe('[GET] /api/game/get', () => {
    it('should return all games in the database', (done) => {
      chai.request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(1);
          done();
        });
    });
  });

  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
