const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
chai.use(chaiHTTP);

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
  let gameId = null;
  let testBand = null;
  beforeEach(done => {
    const myGame =  new Game({
      title: 'BrainGames',
      genre:'Academic',
      releaseDate:'November 2005'
    });
    myGame
    .save()
    .then( game => {
      testGame = game;
      gameId = game._id;
      done();
    })
    .catch(err => {
      console.error(err);
      done();
    });
  });
  afterEach(done => {
    Game.remove({}, err => {
      if (err) console.error(err);
      done();
    });
  });

  describe(`[POST]/game`, () => {
    it('should add a new game', done => {
      const myGame = {
          title: 'BrainGames',
          genre:'Academic',
          releaseDate:'November 2005'
      };
      chai
      .request(server)
      .post('/game')
      .send(myGame)
      .end((err,res) => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('BrainGames');
        done();
      });
    });
    it('should send back 422 upon bad data', done => {
      const myGame = {
        title: 'BrainGames',
        genre:'Academic',
        releaseDate:'November 2005'
    };
    chai
    .request(server)
    .post('/game')
    .send(myGame)
    .end((err,res) => {
      if (err) {
      expect(err.status).to.equal(422);
      const { error } = err.response.body;
      expect(error).to.eql('Invaild input data sent to server');
      done();
      }
    });  
    });
  });

  describe(`[GET]/game`, () => {
    it('should get all the games', done => {
      chai
      .request(server)
      .get('/game')
      .end ((err, res) => {
        if (err) {
          throw new Error(err);
          done();
        }
        expect(res.body[0].title).to.equal(testGame.title);
        expect(res.body[0]._id).to.equal(gameId.toString());
        done();
      });
    });
    });

  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
