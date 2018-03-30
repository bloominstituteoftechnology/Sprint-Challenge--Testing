const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');

const chaiHTTP = require('chai-http');

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
  let gameId = null;
  let testGame = null;
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const myGame = new Game({
      title: 'Tales of Vesperia',
      genre: 'RPG',
      releaseDate: 'Aug 2008',
    });
    myGame
      .save()
      .then(game => {
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
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.error(err);
      done();
    });
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should add a new game', done => {
      const myGame = {
        title: 'Tales of Symphonia',
        genre: 'RPG',
        releaseDate: 'Aug 2003',
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(myGame)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal(myGame.title);
        });
      done();
    });
  });

  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should get all games', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.body[0].title).to.eql(testGame.title);
          // console.log(gameId.toString());
          // console.log(res.body[0]._id);
          expect(res.body[0]._id).to.equal(gameId.toString());
        });
      done();
    });
  });

  // test the PUT here
  describe('[PUT] /api/game/update', () => {
    it('should update a game with the given id', done => {
      const gameUpdate = {
        id: gameId,
        title: 'Tales of Symphonia, Dawn of the New World',
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(gameUpdate)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(res.body.title).to.equal(gameUpdate.title);
        });
      done();
    });
  });
  // --- Stretch Problem ---
  // Test the DELETE here
});
