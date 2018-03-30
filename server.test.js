const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

const Game = require('./models');

describe('Games', () => {
  let gameId = null;
  let testGame = null;
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
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const myGame = new Game({
      title: 'California Games',
      genre: 'Sports',
      date: 'June 1987'
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
  describe(`[POST] /api/game/create`, () => {
    it('should add a new game', done => {
      const myGame = {
        title: 'California Games',
        genre: 'Sports',
        date: 'June 1987'
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(myGame)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('California Games');
          done();
        });
    });
    it('should send back 422 upon bad data', done => {
      const myGame = {
        name: 'California Games',
        genre: 'Sports',
        date: 'June 1987'
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(myGame)
        .end((err, res) => {
          if (err) {
            expect(err.status).to.equal(422);
            const { error } = err.response.body;
            expect(error).to.eql('Error saving data to the DB');
            done();
          } //handle error
        });
    });
  });

  // test the GET here
  describe(`[GET] /api/game/get`, () => {
    it('should get all games', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            throw new Error(err);
            done();
          }
          expect(res.body[0].title).to.eql(testGame.title);
          expect(res.body[0]._id).to.equal(gameId.toString());
          done();
        });
    });
  });

  // test the PUT here
  describe(`[PUT] /api/game/update`, () => {
    it('update a game given an id and title', done => {
      const gameUpdate = {
        id: gameId,
        title: 'WWZ',
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(gameUpdate)
        .end((err, res) => {
          // console.log(res.body);
          if (err) {
            throw new Error(err);
            done();
          }
          expect(res.body.title).to.equal(gameUpdate.title);
          done();
        });
    });

    it('handle error if bad id sent', done => {
      const gameUpdate = {
        id: '12345',
        title: 'California Games',
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(gameUpdate)
        .end((err, res) => {
          if (err) {
            expect(err.status).to.equal(422);
            const { error } = err.response.body;
            expect(error).to.eql('Cannot find game by that id');
          }
          done();
        });
    });
  });

  // --- Stretch Problem ---
  // Test the DELETE here
  describe('[DELETE] /api/game/destroy/:id', () => {
    it('should return the deleted game', (done) => {
      chai.request(server)
        .delete(`/api/game/destroy/${gameId}`)
        .end((err, res) => {
          if (err) {
            console.error(err);
            return done();
          }
          expect(res.body.success).to.equal('California Games was removed from the DB');
          Game.findById(gameId, (err, deletedGame) => {
            if (err) {
              console.log(err);
              return done();
            }
            expect(deletedGame).to.equal(null);
            done();
          });
        });
    });
  });
});
