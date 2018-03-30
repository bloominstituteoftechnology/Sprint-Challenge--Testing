const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server.js');

chai.use(chaiHTTP);

const Game = require('./models');

describe('Games', () => {
  before((done) => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });

  let gameId = null;
  let testGame = null;

  beforeEach((done) => {
    const newGame = new Game({
      title: 'California Games',
      genre: 'Sports',
      date: 'June 1987',
    });
    newGame
      .save()
      .then((game) => {
        testGame = game;
        gameId = game._id;
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });

  afterEach((done) => {
    Game.remove({}, (err) => {
      if (err) console.error(err);
      done();
    });
  });

  describe('[POST] /api/game/create', () => {
    it('should save a new game to the db', (done) => {
      const newGame = {
        title: 'Another Sweet game',
        genre: 'Fighting',
        releaseDate: 'June 1989',
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Another Sweet game');
        });
      done();
    });
  });

  describe('[GET] /api/game/get', () => {
    it('should return all games from the db', (done) => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body[0].title).to.equal('California Games');
        });
      done();
    });
  });

  describe('[PUT] /api/game/update', () => {
    it('should return the updated game', (done) => {
      const updatedGame = {
        title: 'Okalahoma Games',
        id: gameId,
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(updatedGame)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Okalahoma Games');
        });
      done();
    });
  });

  describe('[DELETE] /api/game/destroy/', () => {
    it('should return the title', (done) => {
      chai
        .request(server)
        .delete('/api/game/destroy/' + gameId)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('success');
        });
      done();
    });
  });
});
