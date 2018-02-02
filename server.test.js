const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
chai.use(chaiHTTP);

const Game = require('./models');
const server = require('./server');

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
  let gameId = null;
  let testBand = null;
  beforeEach(done => {
    const myGame =  new Game({
      title: 'BrainGames',
      genre:'Academic',
      releaseDate:'November 2005'
    });
    myGame
    .save()
    .then( game => {
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
    Game.remove({}, err => {
      if (err) console.error(err);
      done();
    });
  });

  describe(`[POST]/api/game/create`, () => {
    it('should add a new game', done => {
      const myGame = {
          title: 'BrainGames',
          genre:'Academic',
          releaseDate:'November 2005'
      };
      chai
      .request(server)
      .post('/api/game/create')
      .send(myGame)
      .end((err,res) => {
        if(err) {
          throw new Error(err)
        }
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('BrainGames');
        done();
      });
    });
  });

  describe(`[GET]/api/game/get`, () => {
    it('should get all the games', done => {
      chai
      .request(server)
      .get('api/game/get')
      .end ((err, res) => {
        if (err) {
          throw new Error(err);
          done();
        }
        expect(res.status).to.equal(200)
        expect(res.body[0].title).to.equal(testGame.title);
        expect(res.body[0].genre).to.equal(testGame.genre);
        expect(res.body[0].releaseDate).to.equal(testGame.releaseDate);
        expect(res.body[0]._id).to.equal(gameId.toString());
        done();
      });
    });
    });

  describe(`[PUT]/api/game/update`, () => {
    it('should update a game given id', done => {
      const gameUpdate = {
        id: gameId,
        title: 'newGameTitle'
      };
      chai
      .request(server)
      .put(`/api/game/update`)
      .send(gameUpdate)
      .end((err, res) => {
        if(err) {
          throw new Error(err);
          done();
        }
        expect(res.body.title).to.equal(gameUpdate.title);
        done();
      });
    });
    it('should handle error if bad id sent', done => {
      const gameUpdate ={
        id: 'ofiewo',
        title: 'NewGameTitle'
      };
      chai
      .request(server)
      .put('/api/game/update')
      .send(gameUpdate)
      .end((err, res) => {
        if (err) {
          expect(err.status).to.equal(422);
          const { error } = err.response.body;
          expect(error).to.eql('Cannot find game by that id');
        }
        done();
      });
    });
  });

  // --- Stretch Problem ---
  describe(`[DELETE]/api/game/destroy/:id`, () => {
    it('should remove game by id', done => {
      chai
      .request(server)
      .delete(`/api/game/destroy/${gameId}`)
      .end((err,res) => {
        if(err) {
          throw new Error(err);
          done();
        }
        expect(res.text).to.equal(' {"success":"BrainGames was removed from the DB"}');
        Game.findById(gameId, (err, deletedGame) => {
          if(err) {
            throw new Error(err);
            done();
          }
          expect(deletedGame).to.equal(null);
          done();
        });
      });
    });
  });
});
