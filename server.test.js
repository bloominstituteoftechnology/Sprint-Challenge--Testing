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
  beforeEach(done => {
    let gameId;
    let  testGame;
    
    const newGame = new Game({
      title: 'Galaga',
      releaseDate: 'December 1981',
      genre: 'Fixed Shooter'
    });
    newGame
      .save()
      .then(game => {
        testGame = game;
        gameId = game._id;
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });
  afterEach(done => {
    Game.remove({}, err => {
      if (err) console.log(err);
    });
  });

  // test the POST here
  describe('[POST /api/game/create', () => {
    const newGame = {
      title: 'Mortal Kombat',
      releaseDate: 'October 1992',
      genre: 'Fighting'
    };
    chai
      .request(server)
      .post('/api/game/create')
      .send((err, res) => {
        expect(res.status).to.equal(422);
        const { error } = err.response.body;
        expect(error).to.eql('There was a problem saving to the database.');
        done();
      });
  });

  // test the GET here

  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
