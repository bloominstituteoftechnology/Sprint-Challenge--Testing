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
        });
    });
    it('Should provide an error if the game does not have a title', done => {
      const newGame = {
        releaseDate: 'October 1988',
        genre: 'Platformer'
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          expect(err.response.body.error).to.equal('Error saving data to the DB');
          done();
        });
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
      const updateGame = { id: gameId, title: 'Duck Hunt' };
      chai
        .request(server)
        .put('/api/game/update')
        .send(updateGame)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Duck Hunt');
          done();
        });
    });
    it('Should provide an error if title is missing from game', done => {
      const updateGame = { id: gameId };
      chai
        .request(server)
        .put('/api/game/update')
        .send(updateGame)
        .end((err, res) => {
          expect(err.response.body.error).to.equal('Must Provide a title && Id');
          done();
        });
    });
    it('Should provide an error if the game is not found by a given Id', done => {
      const updateGame = { id: 2, title: 'Duck Hunt' };
      chai
        .request(server)
        .put('/api/game/update')
        .send(updateGame)
        .end((err, res) => {
          expect(err.response.body.error).to.equal('Cannot find game by that id');
          done();
        });
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
        });
    });
    it('Should provide an error if the Id is not in the DB', done => {
      chai
        .request(server)
        .delete('/api/game/destroy/01010101')
        .end((err, res) => {
          expect(err.response.body.error).to.equal('Cannot find game by that id');
          done();
        });
    });
    it('Should provide an error if there is no Id provided', done => {
      chai
        .request(server)
        .delete('/api/game/destroy/')
        .end((err, res) => {
          expect(err.response.body.error).to.equal('You need to give me an ID');
          done();
        });
    });
  });
});
