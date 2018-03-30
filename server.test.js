const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

const Game = require('./models');

describe('Games', () => {
  before((done) => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () =>
      console.error.bind(console, 'connection error')
    );
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });

  let testGameID = null;
  let testGame = null;
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  beforeEach((done) => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: 'Final Fantasy',
      genre: 'RPG',
      releaseDate: '1990',
    });
    newGame
      .save()
      .then((game) => {
        testGame = game;
        testGameID = game._id;
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });
  afterEach((done) => {
    // simply remove the collections from your DB.
    Game.remove({}, (err) => {
      if (err) console.error(err);
      done();
    });
  });

  describe(`[GET] /api/game/get`, () => {
    it('should return all games', (done) => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.body[0].name).to.eql(testGame.name);
          expect(res.body[0]._id).to.equal(testGameID.toString());
          done();
        });
    });
  });
});
