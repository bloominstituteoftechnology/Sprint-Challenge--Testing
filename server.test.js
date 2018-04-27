const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

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
  let gameId;
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {

    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    newGame
      .save()
      .then(savedGame => {
        gameId = savedGame._id.toString();
      })
      .catch(err => {
        console.log(err);
      });
    done();
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log(err);
      return done();
    });
  });

  // test the POST here
  describe(`[POST] /api/games`, () => {
    it('should save a document to the db', done => {
      chai
        .request(server)
        .post('/api/games')
        .send({ title: '', releaseDate: '', genre: ''})
        .then(response => {
          done();
        })
        .catch(err => {
          throw err;
        });
    });
    it(`Should fail if the title, release date or genre are not provided`, () => {
      return chai
        .request(server)
        .post('/api/games')
        .send({ bad: 'daat' })
        .then(res => {
          const titleMessage = res.body.errors.title.message;
          const dateMessage = res.body.errors.releaseDate.message;
          const genreMessage = res.body.errors.genre.message;
          expect(res.states).to.equal(422);
          expect(titleMessage).to.equal('Path `title` is required.');
          expect(dateMessage).to.equal('Path `date` is required.');
          expect(genreMessage).to.equal('Path `genre` is required.');
        });
    });
  });
  // test the GET here
  describe(`[GET] /api/games`, () => {
    it('should get a list of all the games in db', done => {
      chai
        .request(server)
        .get('/api/games')
        .then(response => {
          // console.log(response.body);
          const { _id, name, genre } = response.body[0];
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('array');
          expect(_id).to.equal(gameId);
          expect(name).to.equal('California Games');
          done();
        })
        .catch(err => {
          throw err;
        });
    });
    it.skip('Should fail if bad URL is provided', () => {}); // puts in pending state
  });
  // Test the DELETE here
  
  // --- Stretch Problem ---
  // test the PUT here
});
