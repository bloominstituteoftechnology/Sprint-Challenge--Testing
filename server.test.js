/* 
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');

const Game = require('./models');

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
    done();
  });
  let gameId;
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    const newGame = new Game({
      title: 'awesome battle',
      genre: 'battle',
      releaseDate: new Date(),
    });
    // each time this hook runs, you should save a document to your db
    newGame
      .save()
      .then()
      .catch();
    // by saving the document you'll be able to use it in each of your `it` blocks
    done();
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    done();
  });

  // test the POST here
  describe(`[POST] /api/game/create`, () => {
    it('should post a game', () => {
      return chai
        .request(server)
        .post('api/game/create')
        .send({
          title: 'awesome battle',
          genre: 'battle',
          releaseDate: 'today',
        })
        .then(response => console.log(response.body, '+++++++'))
        .catch(err => {
          // console.log(err);
          console.log('++++++ failed');
        });
    });
  });

  // test the GET here

  // Test the DELETE here

  // --- Stretch Problem ---
  // test the PUT here
});
*/
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
  let gameId;
  beforeEach(done => {
    const game = new Game({
      title: 'Video Game',
      genre: 'Action',
      releaseDate: '2034',
    });
    game.save((err, savedGame) => {
      if (err) {
        done(err);
      }
      gameId = savedGame._id.toString();
      done();
    });
  });
  afterEach(done => {
    Game.remove({}, err => {
      if (err) {
        done(err);
      }
      let gameId;
      done();
    });
  });

  // test the POST here
  describe(`[POST] /api/game/create`, () => {
    it('should save document to the DB', done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({
          title: 'Board Game',
          genre: 'Murder Mystery',
          releaseDate: '1918',
        })
        .end((err, response) => {
          if (err) {
            done(err);
          }
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.title).to.be.an('string');
          expect(response.body.genre).to.be.an('string');
          expect(response.body.releaseDate).to.be.an('string');
          done();
        });
    });
  });

  // test the GET here
  describe(`[GET] /api/game/get`, () => {
    it('should get a list of all games from the DB', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, response) => {
          if (err) {
            done();
          }
          expect(response.status).to.equal(200);
          expect(Array.isArray(response.body)).to.equal(true);
          expect(response.body[0].title).to.be.an('string');
          expect(response.body[0].genre).to.be.an('string');
          expect(response.body[0].releaseDate).to.be.an('string');
          done();
        });
    });
  });

  // Test the DELETE here
  describe(`[Delete] /api/game/destroy/:id`, () => {
    it('should delete document to the DB', done => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${gameId}`)
        .end();
      done();
    });
  });
  // --- Stretch Problem ---
  // test the PUT here
});
