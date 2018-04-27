const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http')
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
    const newGame = new Game ({
      title: 'One Piece',
      genre: 'Adventure Game',
      releaseDate: 'September 7, 2005'
    });

    newGame.save((error,savedGame) => {
      if (error) {
        console.log(error);
        return done();
      }
      gameId = saveGame._id;
      done();
    });

  });

  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, error => {
      if(error) console.log(error);
      done();
    });
  });



  // test the POST here
    describe ('[POST] /api/game/create', () => {
      it('should add new game', done => {
        const gameDBZ = {
          title: 'Dragon Ball Z: Ultimate Tenkaichi',
          genre: 'Fighting Game',
          releaseDate: 'October 25, 2011'
        };

        chai
          .request(server)
          .post('/api/game/create')
          .send(gameDBZ)
          .end((error, res) => {
            if(error) {
              console.error(error);
              done();
            }
            expect(res.status).to.equal(200);
            expect(res.body.title).to.equal('Dragon Ball Z: Ultimate Tenkaichi')
            done();
          });
      });
      it('should return error if unable to add new game', done => {
          const gameDBZ = {
            title: 'Dragon Ball Z: Ultimate Tenkaichi',
            genre: 'Fighting Game',
            releaseDate: 'October 25, 2011'
          };

          chai
            .request(server)
            .post('/api/game/create')
            .send(gameDBZ)
            .end((error,res) => {
              if(error) {
                console.error(error);
                done();
              }
              expect(error.status).to.equal(400)
            });
      });
    });
  // test the GET here
  describe ('[GET] /api/game/get', () => {
    it('should return list of all games', done => {
      const gameDBZ = {
        title: 'Dragon Ball Z: Ultimate Tenkaichi',
        genre: 'Fighting Game',
        releaseDate: 'October 25, 2011'
      };

      chai
        .request(server)
        .get('/api/game/get')
        .send(gameDBZ)
        .end((error, res) => {
          if(error) {
            console.error(error);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Dragon Ball Z: Ultimate Tenkaichi')
          done();
        });
    });
    it('should return error if unable get list from database', done => {
        const gameDBZ = {
          title: 'Dragon Ball Z: Ultimate Tenkaichi',
          genre: 'Fighting Game',
          releaseDate: 'October 25, 2011'
        };

        chai
          .request(server)
          .post('/api/game/get')
          .send(gameDBZ)
          .end((error,res) => {
            if(error) {
              console.error(error);
              done();
            }
            expect(error.status).to.equal(400)
          });
    });
  });
  // Test the DELETE here
  describe ('[DELETE] /api/game/destroy/:id', () => {
    it('should remove game from database', done => {
      const gameDBZ = {
        title: 'Dragon Ball Z: Ultimate Tenkaichi',
        genre: 'Fighting Game',
        releaseDate: 'October 25, 2011'
      };

      chai
        .request(server)
        .delete(`/api/game/destroy/${gameId}`)
        .send(gameDBZ)
        .end((error, res) => {
          if(error) {
            console.error(error);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Dragon Ball Z: Ultimate Tenkaichi')
          done();
        });
    });
    it('should return error if unable to remove game from databe', done => {
        const gameDBZ = {
          title: 'Dragon Ball Z: Ultimate Tenkaichi',
          genre: 'Fighting Game',
          releaseDate: 'October 25, 2011'
        };

        chai
          .request(server)
          .post('/api/game/create')
          .send(gameDBZ)
          .end((error,res) => {
            if(error) {
              console.error(error);
              done();
            }
            expect(error.status).to.equal(400)
          });
    });
  });
  // --- Stretch Problem ---
  // test the PUT here
});
