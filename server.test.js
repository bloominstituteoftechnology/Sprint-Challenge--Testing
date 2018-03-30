const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

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

  let gameId;

  beforeEach((done) => {
    new Game({
      title: 'Mega Man',
      releaseDate: 'December 17, 1987',
      genre: 'Action Platformer'
    }).save((err, savedGame) => {
      if (err) {
        console.log(err);
        return done();
      }
      gameId = savedGame.id;
      done();
    });
  });

  afterEach((done) => {
    Game.remove({}, (err) => {
      if (err) {
        console.log(err);
        return done();
      };
      mongoose.connection.db.dropDatabase();
      done();
    });
  });

  describe('[POST] /api/game/create', () => {
    it('should add a new game', (done) => {
      const game = {
        title: 'Contra',
        releaseDate: 'February 20, 1987',
        genre: 'Run and gun'
      };

      chai.request(server)
        .post('/api/game/create')
        .send(game)
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Contra');
          done();
        });
    });

    it('should return HTTP status 422 when failing to save to the database', (done) => {
      const game = {
        title: 'Contra',
        releaseDate: 'February 20, 1987',
      };

      chai.request(server)
        .post('/api/game/create')
        .send(game)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });
  });

  describe('[GET] /api/game/get', () => {
    it('should return all games in the database', (done) => {
      chai.request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(1);
          done();
        });
    });
    it('should return an array', (done) => {
      chai.request(server)
      .get('/api/game/get')
      .end((err, res) => {
        if (err) {
          console.log(err);
          return done();
        }
        expect(Array.isArray(res.body)).to.equal(true);
        expect(res.body.length).to.equal(1);
        done();
      });
    });
  });

  describe('[PUT] /api/game/update', () => {
    it('should update a game document in the database', (done) => {
      const update = {
        id: gameId,
        title: 'Castlevania'
      };
      chai.request(server)
        .put('/api/game/update')
        .send(update)
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.body.title).to.equal('Castlevania');
          done();
        });
    });

    it('should return HTTP status 422 when no title is provided', (done) => {
      const update = {
        id: gameId,
      };
      chai.request(server)
        .put('/api/game/update')
        .send(update)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('should return HTTP status 422 when an invalid ID is provided', (done) => {
      const update = {
        id: 8385913296527396,
        title: 'Castlevania'
      };
      chai.request(server)
        .put('/api/game/update')
        .send(update)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    })
  });

  // --- Stretch Problem ---
  describe('[DELETE] /api/game/destroy/:id', () => {
    it('should remove the specified game from the database', (done) => {
      chai.request(server)
        .delete(`/api/game/destroy/${gameId}`)
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(res.text).to.equal('{"success":"Mega Man was removed from the DB"}');
          Game.findById(gameId, (err, deletedGame) => {
            if (err) {
              console.log(err);
              return done();
            }
            expect(deletedGame).to.equal(null);
            done();
          });
        });
    });

    // it('should return HTTP status 422 when no ID is provided', (done) => {
    //   chai.request(server)
    //     .delete('/api/game/destroy/')
    //     .send({})
    //     .end((err, res) => {
    //       expect(res.status).to.equal(422);
    //       done();
    //     });
    //   });
    // You can't actually test the above, '/api/game/destroy' is not a valid endpoint, it will return 404 to DELETE requests.
    // It HAS to have an ID passed in the parameter, it does not actually work with accepting an object containing an id.

    it('should return HTTP status 422 when an invalid ID is provided', (done) => {
      chai.request(server)
        .delete('/api/game/destroy/I_am_an_invalid_id')
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
      });
  });
});
