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
  });
  let gameId;
  // hint - these wont be constants because you'll need to override them.

  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: 'Game Title',
      genre: 'Game Genre',
      releaseDate: 'Game Release Date',
    });
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
  describe(`[POST] /api/game/create`, () => {
    it('should save a document to the db', done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({
          title: 'Game Title 1',
          genre: 'Game Genre 1',
          releaseDate: 'Game Release Date 1',
        })
        .then(response => {
          const { body } = response;
          expect(response.status).to.equal(201);
          expect(body.length).to.equal(3);
          expect(body).to.be.an('object');
          expect(body).to.have.own.property('title');
          expect(body).to.have.own.property('genre');
          expect(body).to.have.own.property('releaseDate');
          expect(body.title).to.equal('Game Title 1');
        })
        .catch(err => {
          throw err;
        });
      done();
    });
    it(`Should fail if title and genre aren't provided`, () => {
      return chai
        .request(server)
        .post('/api/game/create')
        .send({ badRequest: 'bad request' })
        .then(response => {
          const titleMessage = response.body.errors.title.message;
          const genreMessage = response.body.errors.genre.message;
          expect(response.status).to.equal(422);
          expect(titleMessage).to.equal('Path `title` is required.');
          expect(genreMessage).to.equal('Path `genre` is required.');
        })
        .catch(err => {
          throw err;
        });
      done();
    });
  });

  // test the GET here
  describe(`[GET] /api/game/get`, () => {
    it('should get a list of all the games in the db', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .then(response => {
          // console.log(response.body);
          const { _id, title, genre, releaseDate } = response.body[0]; // !! release date is not required
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('array');
          expect(response.body[0]).to.be.an('object');
          expect(_id).to.equal(gameId);
          expect(title).to.equal('Game Title 1');
        })
        .catch(err => {
          throw err;
        });
      done();
    });
    it('Should fail if bad URL is provided', () => {
      return chai // !! why need return? promises?
        .request(server)
        .get('/api/game/bad-get')
        .then(response => {
          console.log('+++', response, '+++');
          // const errorMessage = error.x
          // expect(errorMessage).to.equal('x');
        })
        .catch(err => {
          throw err;
        });
      done();
    });
  });

  // Test the DELETE here
  describe(' [DELETE] /api/game/destroy/:id', (req, res) => {
    it('Should delete a document from the db', done => {
      chai
        .request(server)
        .delete('/api/game/destroy/' + gameId) // !! not sure if this will work
        .send({ id: gameId })
        .then(response => {
          // const successMessage = response.success;
          // expect(successMessage).to.equal('Game Title 1 was removed from the DB');
          expect(response.status).to.equal(204);
        })
        .catch(err => {
          throw err;
        });
      done();
    });
  });

  // --- Stretch Problem ---
  // test the PUT here
});
