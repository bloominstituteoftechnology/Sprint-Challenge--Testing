const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
const chaihttp = require('chai-http');
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
  let gameID = null;
  let testGame = null;

  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const myGame = new Game({
      title: 'Tekken 1',
      genre: 'Action',
      releaseDate: 'December 1994'
    });
    myGame.save()
      .then(game => {
        testGame = game;
        gameID = game._id;
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
    })
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should create a new game', done => {
      const myGame = {
        title: 'X Men vs Street Fighter',
        genre: 'Action',
        releaseDate: 'September 1996'
      }
      chai.request(server)
          .post('/api/game/create')
          .send(myGame)
          .end((err, res) => {
            if (err) {
              expect(err.status).to.equal(200);
              expect(res.body.title).to.equal('X Men vs Street Fighter');
            }
            done();
          });
    });
    it('should send back 422 upon bad data', done => {
      const myGame = {
        ritle: 'X Men vs Street Fighter',
        genre: 'Action',
        releaseDate: 'September 1996'
      }
      chai.request(server)
          .post('/api/game/create')
          .send(myGame)
          .end((err, res) => {
            if (err) {
              expect(err.status).to.equal(422);
              const { error } = err.response.body;
              expect(error).to.equal('Error saving data to the DB');
            }
            done();
          });
    });
  });

  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should get all games', done => {
      chai.request(server)
          .get('/api/game/get')
          .end((err, res) => {
            if (err) {
              throw new Error(error);
              done();
            }
            expect(res.body[0].title).to.equal(testGame.title);
            expect(res.body[0]._id).to.equal(gameID.toString());
            done();
          });
    });
  });

  // test the PUT here
  describe('[PUT] /api/game/update', () => {
    it('updates a document given an id and some text', done => {
      const updatedGame = {
        id: gameID,
        name: 'Pokemon Yellow',
        releaseDate: 'September 1998'
      }
      chai.request(server)
          .put('/api/game/update')
          .send(updatedGame)
          .end((err, res) => {
            if (err) {
              console.error(err);
              done();
            }
            expect(res.body.title).to.equal(updatedGame.title);
            expect(res.body.releaseDate).to.equal(updatedGame.releaseDate);
            done();
          });
    });
    it('handle erorr if bad id sent', done => {
      const updatedGame = {
        id: 'asdfsdfg',
        title: 'Mario Kart 64',
        releaseDate: 'February 1997'
      }
      chai.request(server)
          .put('/api/game/update')
          .send(updatedGame)
          .end((err, res) => {
            if (err) {
              // expect(err.status) = err.response.body;
              const { error } = err.response.body;
              expect(error).to.equal('Cannot find game by that id');
            }
            done();
          });
    });
  });

  // --- Stretch Problem ---
  // Test the DELETE here
});
