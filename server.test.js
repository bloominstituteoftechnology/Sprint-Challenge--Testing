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
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  let title, date, genre;
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    let testGame = new Game({
      title: 'Contra',
      date: 'August 1984',
      genre: 'action',
    });
    testGame
      .save()
      .then(game => {
        testGame = game;
        gameId = game._id;
        done();
      })
      .catch(err => {
        console.log(err);
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
  describe('[POST /api/game/create', () => {
    it('should add a new game', done => {
      const myGame = {
        title: 'Contra',
        date: 'August 1984',
        genre: 'Action',
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(myGame)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Contra');
          done();
        });
    });
    it('should return status 422 upon bad data', () => {
      const myGame = {
        name: 'Contra',
        date: 'August 1984',
        genere: 'Action',
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send((err, res) => {
          expect(res.status).to.equal(422);
          const { error } = err.response.body;
          expect(error).to.eql('Error saving data to the DB');
          done();
        });
    });
  });

  // test the GET here

  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
