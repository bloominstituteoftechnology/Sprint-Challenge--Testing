const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHTTP = require('chai-http');
const Game = require('./models');
const server = require('./server');

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
  // write a beforeEach hook that will populate your test DB with data
  // each time this hook runs, you should save a document to your db
  // by saving the document you'll be able to use it in each of your `it` blocks
  beforeEach(done => {
    const battlefieldOne = new Game({
      title: 'Battlefield One',
      genre: 'First Person Shooter',
      releaseDate: 'October 21, 2016'
    })
    battlefieldOne.save((error, savedGame) => {
      if (error) {
        console.log(error);
        return done();
      }
    });
    const battlefield4 = new Game({
      title: 'Battlefield4',
      genre: 'First Person Shooter',
      releaseDate: 'October 29, 2013'
    })
    battlefield4.save((error, savedGame) => {
      if (error) {
        console.log(error);
        return done();
      }
      gameId = savedGame._id;
      done();
    });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    // Game.remove({}, error => {
    //   if(error) console.log(error);
    //   return done();
    // });
    Game.remove({}).then(done()).catch((error) => {console.log(error); done();});
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should add a new game with a response status code of 200', done => {
      const GTAV = {
        title: 'Grand Theft Auto V',
        genre: 'Action/Adventure',
        releaseDate: 'Septer 17, 2013'
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(GTAV)
        .end((error, res) => {
          if(error) {
            console.log(error);
            return done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Grand Theft Auto V');
          done();
        });
    });
  });

  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should return all the games', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((error, res) => {
          if(error) {
            console.log(error);
            return done();
          }
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);

          return done();
        })
    })
  })

  // Test the DELETE here
  describe(` [DELETE] /api/game/destroy/:id`, () => {
    it('should be able to delete the game', done => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${gameId}`)
        .end((error, res) => {
          if (error) {
            console.log(error);
            done();
          }
          expect(res.status).to.equal(200);
          Game.findByIdAndRemove(gameId, (error, game) => {
            if (error) {
              console.log(error);
              done();
            }
            expect(game).to.equal(null);
            done();
          });
        });
    });
  });

  // --- Stretch Problem ---
  // test the PUT here
  describe(` [PUT] /api/game/update`, () => {
    it('should be able to update the name of a game', done => {
      let gameID = gameId
      const update = {
        title: 'Battlefield 4',
        id: gameID
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(update)
        .end((error, res) => {
          if (error) {
            console.log(error);
            return done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Battlefield 4');
          return done();
        });
    });
  });

});
