const mongoose = require('mongoose');
const server = require('./server');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

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

  beforeEach(done => {
    new Game({

      title: 'Super Mario Bros',
      releaseDate: 'October 1988',
      genre: 'Platformer'

    }).save((err, savedGame) => {
      if (err) {
        console.log(err);
        return done();
      }
      gameId = savedGame.id;
      done();
    })
  });
  afterEach(done => {
    Game.remove()
      .then(() => done())
      .catch(error => done(error))
  });

  describe('[POST] /api/game/create', () => {
    it('Should add a game to the database', () => {
      const newGame = {
        title: 'Super Mario Bros',
        releaseDate: 'October 1988',
        genre: 'Platformer'
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(newGame)
        .then(res => {
          expect(res.status).to.equal(201);
          expect(res.body.game.title).to.equal('Super Mario Bros')
          done();
        })
        .catch(err => done(err));
    });
  });
  describe('[GET] /api/game/get', () => {
    it('Should get all games from the database', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0].title).to.equal('Super Mario Bros');
          done();
        })
        .catch(err => done(err));
    });
  });
  describe('[PUT] /api/game/update', () => {
    it('Should update a game', () => {
      const updateGame = { id: gameId, title: 'Duck Hunt', releaseDate: 'November 1988', genre: 'Shooter' };
      chai
        .request(server)
        .put('/api/game/update')
        .send(updateGame)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Duck Hunt');
          expect(res.body.releaseDate).to.equal('November 1988');
          expect(res.body.genre).to.equal('Shooter');
          done();
        })
        .catch(err => done(err));
    });
  });
  describe('[DELETE] /api/game/destroy/:id', () => {
    it('Should delete a game by a given id', done => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${gameId}`)
        .then(res => {
          expect(res.status).to.equal(200);
          done();
        })
        .catch(err => done(err));
    });
  });
});
