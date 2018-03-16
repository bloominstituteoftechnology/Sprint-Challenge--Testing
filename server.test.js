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
    let gameId = null;
    let testGame = null;
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

    
    const thisGame = new Game({
      title: 'Kirby\'s Adventure',
      releaseDate: 'May 1993',
      genre: 'Action Platformer'
    });
    thisGame
      .save()
      .then(game => {
        testGame = game;
        gameId = game._id;
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });
  afterEach(done => {
    Game.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  // test the POST here
  describe('[POST /api/game/create', () => {
    it('should add a new game', done => {
      const thisGame = {
        title: 'Kirby\'s Adventure',
        releaseDate: 'May 1993',
        genre: 'Action Platformer'
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(thisGame)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Kirby\'s Adventure');
          done();
        });
    });
      it('should return Error Status 422 if data is incorrect', () => {
        const thisGame = {
          title: 'Kirby\'s Adventure',
        releaseDate: 'May 1993',
        genre: 'Action Platformer'
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
          done();
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
        expect(res.body.title).to.equal(gameUpdate.title);
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
          expect(error).to.eql('Must Provide a title && Id');
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
        expect(error).to.eql('Cannot find game by that id');
      });
      done();
  });
});
  // --- Stretch Problem ---
  // Test the DELETE here
  describe('[DELETE] /api/game/destroy/:id', () => {
    it('should delete a game when given matching id', done => {
      const deleteGame = {
        id: gameId
      };
      chai
        .request(server)
        .delete('/api/game/destroy/:id')
        .send(deleteGame)
        .end((err, res) => {
          if (err) {
            throw new Error(err);
            done();
          }
          expect(res.status).to.equal(200);
          const { success } = JSON.parse(res.res.text);
          expect(success).to.equal('Kirby\'s Adventure was removed from the DB');
          done();
        });
    });
  });
});
