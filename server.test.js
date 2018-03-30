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

  let gameID = null;

  beforeEach(done => {
    const newGame = new Game({
      title: 'Halo',
      releaseDate: 'November 15, 2001',
      genre: 'First Person Shooter'
    });
    newGame
      .save()
      .then(game => {
        gameID = game._id;
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      })
  });

  afterEach(done => {
    Game.remove({}, err => {
      if (err) console.error(err);
      done();
    });
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should add a new game and save to the database', (done) => {
      const newGame = {
        title: 'Fortnite',
        releaseDate: 'July 25, 2017',
        genre: 'Survival'
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          expect(res.body.title).to.equal('Fortnite')
          done();
        });
    });
    it('should return status 422 upon error saving data', (done) => {
      const newGame = {
        title: 'Fortnite',
        releaseDate: 'July 25, 2017',
        genre: 'Survival'
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          if (err) {
            expect(err.status).to.equal(422);
            done();
          }
          done();
        });
    });
  });
  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should return all games', (done) => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          expect(res.body[0].title).to.equal('Halo');
          done();
        });
    });
    it('should return status 500 upon error retrieving data', (done) => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            expect(err.status).to.equal(500);
            done();
          }
          done();
        });
    });
  });
  // test the PUT here
  describe('[PUT] /api/game/update', () => {
    it('should update the game with the new game title', (done) => {
      const updatedGame = {
        id: gameID,
        title: 'Fortnite Battle Royale',
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
          expect(res.body.title).to.equal(updatedGame.title);
          expect(res.body._id).to.equal(updatedGame.id.toString());
          done();
        });
    });
  });

  // --- Stretch Problem ---
  // Test the DELETE here
  describe('[DELETE] /api/game/destroy/:id', () => {
    it('should remove the game with the given id', (done) => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${gameID}`)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.body).to.have.property('success');
          done();
        });
    });
  });
});
