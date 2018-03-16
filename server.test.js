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
  beforeEach(done => {
    let gameId;
    let  testGame;
    
    const newGame = new Game({
      title: 'Galaga',
      releaseDate: 'December 1981',
      genre: 'Fixed Shooter'
    });
    newGame
      .save()
      .then(game => {
        testGame = game;
        gameId = game._id;
        done();
      })
      .catch(err => {
        console.log(err);
      });
  });
  afterEach(done => {
    Game.remove({}, err => {
      if (err) console.log(err);
    });
  });

  // test the POST here
  describe('[POST /api/game/create', () => {
    const newGame = {
      title: 'Mortal Kombat',
      releaseDate: 'October 1992',
      genre: 'Fighting'
    };
    chai
      .request(server)
      .post('/api/game/create')
      .send(newGame)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('Mortal Kombat');
        done();
      });
      it('should return Error Status 422 if data is incorrect', () => {
        const newGame = {
          title: 'Mortal Kombat',
          releaseDate: 'October 1992',
          genre: 'Fighting'
        };
        chai
          .request(server)
          .post('/api/game/create')
          .send((err, res) => {
            expect(res.status).to.equal(422);
            const { error } = err.response.body;
            expect(error).to.eql('There was a problem saving to the database.');
            done();
          });
      })
  });

  // test the GET here

  describe('[GET] api/game/get', () => {
    it('should return all games', done => {
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
          done;
        });
    });
  });
  // test the PUT here
describe('[PUT] api/game/update', () => {
  it('should update game given the id and the title', done => {
    const gameUpdate = {
      id: gameId,
      title: 'Donkey Kong'
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
        expectr(res.body.title).to.equal(gameUpdate.title);
        done();
      });
  });
  it('should return an error with status 422 if no title is provided', done => {
    const gameUpdate = {
      id: gameId
    };
    chai
      .request(server)
      .put('/api/game/update')
      .send(gameUpdate)
      .end((err, res) => {
        if (err) {
          expect(err.status).to.equal(422);
          const { error } = err.response.body;
          expect(error).to.eql('Title and Id are required for updates.');
        }
        done();
      });
  });
  it('should return an error with status 422 if Id is not given or not found', done => {
    const gameUpdate = {
      title: 'Pac-Man',
      id: 33
    };
    chai
      .request(server)
      .put('/api/game/update')
      .send(gameUpdate)
      .end((err, res) => {
        if (err) expect(err.status).to.equal(422);
        const { error } = err.response.body;
        expect(error).to.eql('That Id does not exist. Please try again.');
      });
      done();
  });
});
  // --- Stretch Problem ---
  // Test the DELETE here
});
