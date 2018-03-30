const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { assert } = chai;
const sinon = require('sinon');

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

  let gameID = null;

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    const newGame = new Game({
      title: 'Counter Strike',
      genre: 'First Person Shooter'
    });
    newGame
      .save()
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
    Game.remove({}, error => {
      if (error) console.error(error);
      done();
    });
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should create a new game in the database', done => {
      const testGame = {
        title: 'Counter Strike',
        genre: 'First Person Shooter'
      };
      chai.request(server)
        .post('/api/game/create')
        .send(testGame)
        .end((err, res) => {
          if (err) {
            console.err(err);
            done();
          }
          assert.equal(res.body.title, 'Counter Strike');
          done();
        })
    })
  })
  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should return the current games in the database', done => {
      const testGame = {
        title: 'Counter Strike',
        genre: 'First Person Shooter'
      };
      chai.request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            done();
          }
        })
      done();
    })
  })
  // test the PUT here
  describe('[PUT] /api/game/update', () => {
    it('should update the inputted game in the database', done => {
      const updateGame = {
        title: 'Reigns2',
        genre: 'Misc.',
        id: gameID
      };
      chai.request(server)
        .put('/api/game/update')
        .send(updateGame)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          assert.equal(res.body.title, 'Reigns2')
          done();
        });
    });
  });
  // --- Stretch Problem ---
  // Test the DELETE here
});