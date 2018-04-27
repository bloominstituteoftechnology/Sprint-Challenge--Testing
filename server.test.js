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
      title: 'Watch Dogs',
      genre: 'Action',
      releaseDate: '2011'
    });
    newGame
      .save()
      .then(savedGame => {
        gameId = savedGame._id.toString();
      })
      .catch(error => console.log(error));
    done();
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

  // Test the DELETE here

  describe('[DELETE] /api/game/destroy/:id', () => {
    it('should be able to delete a game database', done => {
      chai
        .request(server)
        .delete(`/api/game/destory/${gameId}`)
        .end((error, response) => {
          expect(response.body).to.be.an('object');

          done();
        });
    });
  });
});

// --- Stretch Problem ---
// test the PUT here

describe('[PUT] /api/game/update', () => {
  it('should be able to update a game in the database', done => {
    const updateGame = { id: gameId, genre: 'puzzle' };

    chai
      .request(server)
      .put(`/api/game/update`)
      .send(updateGame)
      .end((error, response) => {
        //expect(response.status).to.equal(200);
        expect(response.body.genre).to.equal('puzzle');
        done();
      });
    done();
    // done();
  });
  // .catch(error => {
  //   throw error;
  // });
});
