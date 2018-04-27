const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
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

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });
  let gameId;
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: "Kirby's Adventure",
      genre: 'Action, Adventure',
      releaseDate: 'May 1993',
    });
    newGame
      .save()
      .then(game => {
        console.log(game, 'You added a new game to your library!');
        gameId = game._id.toString();
        done();
      })
      .catch(err => console.log(err));
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log(err);
      return done();
    });
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should post a new game to the database', done => {
      const game = {
        title: 'Galaga',
        genre: 'Action, Adventure',
        releaseDate: 'September 1988',
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(game)
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status).to.equal(200); // not passing test w/ 201?
          expect(res.body.title).to.equal('Galaga');
          done();
        });
    });
  });

  // test the GET here
  describe('[GET] to /api/game/get', () => {
    it('should get a list of all games from the database', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.lengthOf(1);
          done();
        });
    });
  });

  // Test the DELETE here

  // --- Stretch Problem ---
  // test the PUT here
});
