const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaihttp = require('chai-http');

chai.use(chaihttp);

const server = require('./server');
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
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  let newGame = new Game({
    title: 'Final Fantasy VII',
    releaseDate: 'January 31, 1997',
    genre: 'JRPG'
  });
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    newGame
      .save()
      .then(game => {
        testGame = game;
        gameId = game._id;
        done();
      })
      .catch(err => {
        console.error(err);
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
  describe(`[POST]`, () => {
    const badGame = {
      title: 'Final Fantasy XI'
    };
    const goodGame = {
      title: 'Final Fantasy X',
      genre: 'JRPG',
      releaseDate: 'July 19, 2001'
    };
    it('should require correct parameters of title, genre, and data', (done) => {
      chai
        .request(server)
        .post('/api/game/create')
        .send(badGame)
        .end((err, res) => {
          if(err) {
            expect(err.status).to.equal(422);
            expect(err.response.body.error).to.equal('Error saving data to the DB');
            done();
          }
        });
    });
    it('should return the created object', (done) => {
      chai
        .request(server)
        .post('/api/game/create')
        .send(goodGame)
        .end((err, res) => {
          if(err) {
            console.error(err);
            done();
          };
          expect(res.status).to.equal(200);
          expect(res.body).to.include({
            title: 'Final Fantasy X',
            genre: 'JRPG',
            releaseDate: 'July 19, 2001'
          });
          done();
        });
    });
  });

  // test the GET here
  describe(`[GET]`, () => {
    it('should return an array of all the games in the database', (done) => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          };
          expect(res.body[0].title).to.eql(testGame.title);
          expect(res.body[0]._id).to.equal(gameId.toString());
          done();
        });
    });
  });

  // test the PUT here
  describe(`[PUT]`, () => {
    it('should update an item given id and title', (done) => {
      const updateId = {
        id: gameId,
        title: 'Final Fantasy XV'
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(updateId)
        .end((err, res) => {
          expect(res.body.title).to.equal(updateId.title);
          expect(res.status).to.equal(200);
          done();
        })
    });
    it('should return an error if an invalid id is sent', (done) => {
      const badUpdateId = {
        title: 'Not good game',
        id: 'sdafkj39asdf3',
        genre: 'Who cares'
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(badUpdateId)
        .end((err, res) => {
          if (err) {
            expect(err.status).to.equal(422);
            expect(err.response.body.error).to.equal('Cannot find game by that id');
            done();
          }
        })
    });
  });

  // --- Stretch Problem ---
  // Test the DELETE here
});
