const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');

const Game = require('./models');

chai.use(chaiHttp);

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
  let id = null;
  let game = null;

  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const testGame = new Game({
      title: 'Go Fish',
      genre: 'Card Games',
      releaseDate: 'April 1, 1978'
    });
    testGame.save((error, saved) => {
      if (error) {
        console.error(err);
        return done();
      }
      id = saved._id;
      game = saved;
      done();
    });
  });

  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, (error, removed) => {
      if (error) {
        console.error(err);
        return done();
      }
      done();
    });
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should add a new game', (done) => {
      const newGame = new Game({
        title: 'California Games',
        genre: 'Sports',
        releaseDate: 'June 1987'
      });
      chai.request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('California Games');
        });
        done();
    });
  });
  it('should return a 422 error when missing info', (done) => {
    const newGame = {
      genre: 'test genre',
      releaseDate: 'test date'
    };
    chai.request(server)
      .post('/api/game/create')
      .send(newGame)
      .end((err, res) => {
        if (err) console.error(err);

        expect(res.status).to.equal(422);
      });
      done();
  });

  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should return 1 game', (done) => {
      chai.request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          expect(res.body[0].title).to.equal('California Games');
          done();
        });
    });
  });

  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
