const mongoose = require('mongoose');
const server = require ('./server');
const chai = require('chai');
const { expect } = chai;
const chaiHTTP = require('chai-http');
const sinon = require('sinon');

const Game = require('./models');

describe('Games', () => {
  before(done => {
    let gameId = null;
    let testGame = null;
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/video-games');
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
  
  beforeEach(done => {
    const myGame = new Game({
      title: 'Contra',
      date: 'August 1984',
      genre: 'action',
    });
    myGame
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
      if (err) console.error(err);
      done();
    });
  });
 

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should add a new game', done => {
      const myGame = {
        title: 'Contra',
        date: '1984',
        genre: 'Action',
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(myGame)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Contra');
          done();
        });
    });
    it('should return status 422 upon bad data', () => {
      const myGame = {
        name: 'Contra',
        date: '1984',
        genere: 'Action',
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send((err, res) => {
          expect(res.status).to.equal(422);
          const { error } = err.response.body;
          expect(error).to.eql('Error saving data to the DB');
          done();
        });
    });
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
          expect(res.body[0].title).to.equal(testGame.title);
          expect(res.body[0]._id).to.equal(gameId.toString());
          done();
        });
    });
  });

  // test the PUT here
  describe(`[PUT] /api/game/update`, () => {
    it('update a game title by given id and new title', done => {
      const update = {
        id: gameId,
        title: 'Contra',
      };
      chai
        .request(server)
        .put('/api/game/update')
        .send(update)
        .end((err, res) => {
          if (err) return done (err);
          expect(res.body.title).to.equal('Contra');
          done();
        });
    });

   // --- Stretch Problem ---
  // Test the DELETE here
  describe(`[DELETE] /api/game/destroy/:id`, () => {
    it('should delete the game by given id from req.params.id', done => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${gameId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.success).to.equal(`${gameTitle} was removed from the Database`);
          done();
        });
    });
  });
});
});


