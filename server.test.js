const mongoose = require('mongoose');
const chaihttp = require('chai-http');
const chai = require('chai');
const { assert } = chai;
const sinon = require('sinon');

const server = require('./server');
const Game = require('./models');

chai.use(chaihttp);

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

  let testGameId;

  beforeEach(done => {
    const halo = {
      title: 'Halo',
      genre: 'FPS',
      releaseDate: 'November 15, 2001',
    };
    const game = new Game(halo);
    game.save((err, savedGame) => {
      if (err) {
        console.log(err);
        return done();
      }
      testGameId = savedGame._id;
      done();
    });
  });
  afterEach(done => {
    Game.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  describe('[POST] /api/game/create', () => {
    it('should add a new game', done => {
      const smite = {
        title: 'Smite',
        genre: 'MOBA',
        releaseDate: 'March 25, 2014',
      };

      chai
        .request(server)
        .post('/api/game/create')
        .send(smite)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          assert.equal(res.body.title, 'Smite');
          done();
        });
    });
    it('should have a status code of 200', done => {
      const smite = {
        title: 'Smite',
        genre: 'MOBA',
        releaseDate: 'March 25, 2014',
      };

      chai
        .request(server)
        .post('/api/game/create')
        .send(smite)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          assert.equal(res.status, 200);
          done();
        });
    });
  });

  describe('[GET] /api/game/get', () => {
    it('should get all games', done => {
      const smite = {
        title: 'Smite',
        genre: 'MOBA',
        releaseDate: 'March 25, 2014',
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(smite)
        .end((err, res) => {
          //console.log(err || res);
        });

      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            //console.error(err);
            done();
          }
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.lengthOf(res.body, 2);
          assert.equal(res.body[0].title, 'Halo');
          assert.equal(res.body[1].title, 'Smite');
          done();
        });
    });
  });

  describe('[PUT] /api/game/update', () => {
    it("should update the specified game's name", done => {
      const updatedGame = {
        title: 'Halo: Combat Evolved',
        id: testGameId,
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
          assert.equal(res.status, 200);
          assert.equal(res.body.title, 'Halo: Combat Evolved');
          Game.findOne({ title: 'Halo' }, (err, game) => {
            if (err) {
              console.log(err);
              done();
            }
            assert.notExists(game);
            done();
          });
        });
    });
  });

  describe('[DELETE] /api/game/destroy/:id', () => {
    it('should delete the specified game', done => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${testGameId}`)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          assert.equal(res.body.success, 'Halo was removed from the DB');
          Game.findOne({ name: 'Halo' }, (err, game) => {
            if (err) {
              console.log(err);
              done();
            }
            assert.notExists(game);
            done();
          });
        });
    });
  });
});
