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
    let gameId = null;
    let testGame = null;
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
    const myGame = new Game({
      title: 'Contra',
      date: 'August 1984',
      genre: 'action',
    });
    myGame
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
  describe('[POST] /api/game/create', () => {
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
  describe('[GET] api/game/get', () => {
    it('should return all bands', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            throw new Error(err);
            done();
          }
          expect(res.body[0].title).to.eql(testGame.title);
          expect(res.body[0]._id).to.equal(gameId.toString());
          done();
        });
    });
  });

  // test the PUT here
  describe('[PUT] api/game/update', () => {
    it('should update game given id and title', done => {
      const gameUpdate = {
        id: gameId,
        title: 'Mario Bros.',
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(gameUpdate)
        .end((err, res) => {
          if (err) {
            throw new Error(err);
            done();
          }
          expect(res.body.title).to.equal(gameUpdate.title);
          done();
        });
    });

    it('should return error and status 422 if no title', done => {
      const gameUpdate = {
        id: gameId,
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(gameUpdate)
        .end((err, res) => {
          if (err) {
            expect(err.status).to.equal(422);
            const { error } = err.response.body;
            expect(error).to.eql('Must Provide a title && Id');
          }
          done();
        });
    });
    it('should return error and status 422 it given id not found', done => {
      const gameUpdate = {
        title: 'Contra',
        id: 50,
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(gameUpdate)
        .end((err, res) => {
          if (err) expect(err.status).to.equal(422);
          const { error } = err.response.body;
          expect(error).to.eql('Cannot find game by that id');
        });
      done();
    });
  });

  // --- Stretch Problem ---
  // Test the DELETE here
});
