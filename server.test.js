const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHTTP = require('chai-http');
const Game = require('./models');

const server = require('./server');
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

  let testGame, testGameID;

  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    new Game({
      title: 'SinonSpies',
      releaseDate: 'March 30',
      genre: 'Adventure'
    })
    .save()
    .then(game => {
      testGame = game;
      testGameID = game._id;
      done();
    })
    .catch(err => {
      console.error(err);
      done();
    })
});

  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.error(err);
      done();
    });
  });

  // test the POST here

  describe('[POST /api/game/create', () => {
    it('should save a new game', done => {
      const postTestGame = {
        title: 'A Game',
        releaseDate: 'Now',
        genre: 'Mystery'
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(postTestGame)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should return error 422', done => {
      const postTestGame2 = {
        title: 'A Game'
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(postTestGame2)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });
  });

  // test the GET here

  describe('[GET] api/game/get', () => {
    it('should return an array with status 200', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            console.error(err)
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');;
          done();
        });
    });
    it('should return all of the games', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            console.error(err)
            done();
          }
          expect(res.body[0].title).to.eql(testGame.title);
          done();
        });
    });
  });

  // test the PUT here

  describe('[PUT] api/game/update', () => {
    it('should update the game title', done => {
      const updatedGame = {
        id: testGameID,
        title: 'LIFE'
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(updatedGame)
        .end((err, res) => {
          if (err) {
            console.error(err)
            done();
          }
          expect(res.body.title).to.equal(updatedGame.title);
          done();
        });
    });
  });

  // --- Stretch Problem ---
  // Test the DELETE here

  describe('[DELETE] /api/game/destroy/:id', () => {
    it('should remove the game and return status 200', done => {
      chai
        .request(server)
        .delete('/api/game/destroy/:id')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
            done();
          });
        });
    });

});
