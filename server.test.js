const mongoose = require('mongoose');
const chai = require('chai');
const chaitHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');

chai.use(chaitHTTP);

const Game = require('./models');

describe('Games', () => {
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.

  let gameId;

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

  beforeEach(async () => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const game1 = new Game({
      title: 'Excitebike',
      genre: 'Racing',
      date: 'November 30, 1984'
    });
    const game2 = new Game({
      title: 'Code Name: Vooper',
      genre: 'Action/Shooter',
      date: 'March 1990'
    });
    await game1.save();
    await game2.save().then(game => gameId = game.id);
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, (err) => {
      if (err) {
        console.error(err);
      }
      done();
    });
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it ('should return the newly added game', (done) => {
      const game = {
        title: 'Pro Wrestling',
        genre: 'Fighting/Sports',
        date: 'March 1987'
      };

      chai.request(server)
        .post('/api/game/create')
        .send(game)
        .end((err, res) => {
          if (err) {
            console.error(err);
            return done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Pro Wrestling');
          done();
        });
    });

    it('should return an error when missing a title', (done) => {
      const game = {
        genre: 'Platformer/Plumbing Simulator',
      };

      chai.request(server)
        .post('/api/game/create')
        .send(game)
        .end((err, res) => {
          expect(err.response.body.message.message).to.equal('Game validation failed: title: Path `title` is required.');
          expect(res.status).to.equal(422);
          expect(res.body.title).to.be.undefined;
          done();
        });
    });
  });

  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should return the games in the database', (done) => {
      chai.request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            console.error(err);
            return done();
          }
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(2);
          done();
        });
    });
  });

  // test the PUT here
  describe('[PUT] /api/game/update', () => {
    it('should return the updated game', (done) => {
      const game = {
        title: 'Code Name: Viper',
        id: gameId
      };

      chai.request(server)
        .put('/api/game/update')
        .send(game)
        .end((err, res) => {
          expect(err).to.be.a('null');
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Code Name: Viper');
          done();
        });
    });
  });

  // --- Stretch Problem ---
  // Test the DELETE here
});
