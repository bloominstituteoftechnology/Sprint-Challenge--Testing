const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const { assert } = chai;
const sinon = require('sinon');
const chaiHTTP = require('chai-http');

const Game = require('./models');

const server = require('./server');
chai.use(chaiHTTP);

describe('Games', () => {
  before(done => {
    let gameId = null;
    let gameName = null;
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
    const newGame = new Game({
      title: 'Half Life 2',
      releaseDate: 'November 2004',
      genre: 'First Person Shooter'
    });
    newGame
      .save()
      .then(game => {
        gameName = game;
        gameId = game._id;
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });
  afterEach((done) => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  // test the POST here
  describe('[Post] /api/game/create', () => {
    it('should post to database', done => {
      const newGame = new Game({
        title: 'Portal',
        date: 'July 2004',
        genre: 'Puzzle'
      });
      chai
        .request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          if(err) {
            return console.log(err)
            done();
          }
          assert.equal(res.body.title, 'Portal');
          done();
        })
    })
  })
  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should get all the games', done => {
      const PUBG = {
        title: 'PUBG',
        genre: 'Battle Royale',
        releaseDate: 'June, 2014',
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(PUBG)
        .end((err, res) => {
          console.log('error sending to create');
        });

      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            console.error(res.body);
            done();
          }
          assert.equal(res.status, 200)
          assert.equal(res.body[0].title, 'Half Life 2');
          assert.equal(res.body[1].title, 'PUBG');
          done();
        });
    });
  });
  // test the PUT here
  describe('[PUT] /api/game/update', () => {
    it("should update the game info", done => {
      const updatedGame = {
        title: 'Halo 2',
        id: gameId,
      };

      chai
        .request(server)
        .put('/api/game/update')
        .send(updatedGame)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          assert.equal(res.body.title, 'Halo 2');
          done();
        });
    });
  });
  // --- Stretch Problem ---
  // Test the DELETE here
});
