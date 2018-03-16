const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaihttp = require('chai-http');

const server = require('./server');
const Game = require('./models');

chai.use(chaihttp);

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
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    new Game({
      title: 'Super Mario Bros',
      genre: 'dope'
    }).save((err, savedGame) => {
      if (err) {
        console.log(err);
        return done();
      }
      gameID = savedGame.id;
      done();
    });
  });

  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove()
      .then(() => done())
      .catch(err => done(err));
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it(`should post a game correctly to the DB`, () => {
      let create = new Game({
        title: 'California Games',
        genre: 'Sports',
        date: 'June 1987'
      });
      chai
        .request(server)
        .post('/api/game/create')
        .send(create)
        .end((err, res) => {
          if (err) console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('California Games');
        });
    });
  });

  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should be able to locate a game successfully', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body[0].title).to.equal('California Games');
          expect(res.body[0].genre).to.equal('Sports');
          done();
        })
        .catch(err => done(err));
    });
  });

  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
