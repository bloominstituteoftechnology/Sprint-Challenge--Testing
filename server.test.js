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
  let gameId1;
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: 'Watch Dogs',
      genre: 'Action',
      releaseDate: '2011'
    });
    // gameId = savedGame._id.toString();

    newGame.save((error, savedGame) => {
      if (error) {
        console.log(error);
        done();
      }
      gameId1 = savedGame._id.toString();
    });

    const newGame1 = new Game({
      title: 'GTA',
      genre: 'Action',
      releaseDate: '2013'
    });

    newGame1.save((error, savedGame) => {
      if (error) {
        console.log(error);
        done();
      }

      gameId = savedGame._id.toString();
      console.log(gameId);
      done();
    });
    // done();
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({})
      .then(done())
      .catch(err => {
        console.log(err);
        done();
      });
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should create a new game in the database', done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({ title: 'NBA', genre: 'Action', releaseDate: '1990' })
        .then(response => {
          expect(response.status).to.equal(200);
          done();
        });
    });
  });

  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should get a list of games in database', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .then(response => {
          const { _id, title, genre, releaseDate } = response.body[0];
          expect(response.status).to.equal(200);
          done();
        });
    });
  });

  describe('[PUT] /api/game/update', () => {
    it('should be able to update a game in the database', done => {
      //let gameid = gameId;
      const updateGame = { id: gameId, title: 'Changed' };

      chai
        .request(server)
        .put(`/api/game/update`)
        .send(updateGame)
        .end((error, response) => {
          //expect(response.status).to.equal(200);
          if (error) {
            console.log(response);
            done();
          }
          expect(response.status).to.equal(200);

          expect(response.body).to.be.an('object');
          expect(response.body.title).to.equal('Changed');

          // expect(response.body.title).to.equal('Changed');
          done();
        });
      // done();
      // done();
    });
    // .catch(error => {
    //   throw error;
    // });
  });
  // Test the DELETE here

  describe('[DELETE] /api/game/destroy/:id', () => {
    it('should be able to delete a game database', done => {
      chai
        .request(server)
        .delete(`/api/game/destory/${gameId}`)
        .then(response => {
          expect(response.status).to.be.equal(200);
          done();
        })
        .catch(error => {
          throw error;
        });
      Game.findByIdAndRemove(gameId)
        .then(response => {
          expect(response).to.equal(null);
          done();
        })
        .catch(error => {
          console.log(error);
        });
      done();
    });
  });
});

// --- Stretch Problem ---
// test the PUT here
