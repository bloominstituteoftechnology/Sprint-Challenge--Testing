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
    let newGame = new Game({
      title: 'Super Mario Bros',
      releaseDate: 'September 1985',
      genre: 'Platformer'
    });
    newGame.save((err, savedGame) => {
      if (err) {
        console.log(err);
        done();
      }
      gameId = savedGame.id;
      done();
    });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  // test the POST here
  describe(`[POST] /api/game/create`, () => {
    let newGame = new Game({
      title: 'Super Mario Bros',
      releaseDate: 'September 1985',
      genre: 'Platformer'
    });
    it('should save a new game document to the db', done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.status).to.equal(201);
          expect(res.body.title).to.equal('Super Mario Bros');
          expect(typeof res.body.genre).to.equal('string');
          done();
        });
    });
    it('should fail if the title, releaseDate and genre are not provided', done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({ message: 'bad data' })
        .end(res => {
          expect(res.status).to.equal(422);
          done();
        });
    });
  });

  // test the GET here
  describe(`[GET] /api/game/get`, () => {
    it('should get a list of games from the db', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          const { title, releaseDate, genre } = res.body[0];
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(1);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(title).to.equal('Super Mario Bros');
          expect(releaseDate).to.equal('September 1985');
          expect(genre).to.equal('Platformer');
          done();
        });
    });
  });
  // Test the DELETE here
  describe(`[DELETE] /api/game/destroy/:id`, () => {
    it('should delete the game document from the db', done => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${gameId}`)
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done;
          }
          Game.findById(gameId, (err, deletedGame) => {
            if (err) {
              console.log(err);
              return done;
            }
            expect(deletedGame).to.equal(null);
          });
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  // --- Stretch Problem ---
  // test the PUT here
  describe(`[PUT] /api/game/update`, () => {
    it('should update the game document in the db', done => {
      const update = {
        title: 'Super Mario Bros'
        // releaseDate: 'September 1985',
        // genre: 'Platformer'
      };
      chai
        .request(server)
        .put(`/api/game/update`)
        .send(update)
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Super Mario Bros');
          done();
        });
    });
  });
});
