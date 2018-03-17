const mongoose = require('mongoose');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaiHTTP);

const Game = require('./models');

describe('Games', () => {
  before((done) => {
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

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });

  beforeEach((done) => {
    const myGame = new Game({
      title: 'Battlegrounds', 
      releaseDate: 'December 2017', 
      genre: 'Battle Royale',
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

  afterEach((done) => {
    Game.remove({}, err => {
      if (err) console.error(err);
      done();
    });
  });

  // test the POST here
  describe(`[POST] /api/game/create`, () => {
    it('should add a new game', (done) => {
      const myGame = {
        title: 'Battlegrounds', 
        releaseDate: 'December 2017', 
        genre: 'Battle Royale',
      };
      chai.request(server)
          .post(`/api/game/create`)
          .send(myGame)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.title).to.equal('Battlegrounds');
            done();
          });
    });

    it('should send back a 422 for bad data', () => {
      const myGame = {
        title: 'Battlegrounds', 
        date: 'December 2017', 
        genre: 'Battle Royale',
      };
      chai.request(server)
          .post('/api/game/create')
          .send(myGame)
          .end((err, res) => {
            if (err) {
              const expected = 'Invalid input data sent to server'
              expect(res.status).to.equal(422);
              const { error } = err.response.body;
              expect(error).to.equal(expected);
              done();
            }
          });
    });
  });

  // test the GET here
  describe(`[GET] api/game/get`, () => {
    it('should update game id and title', (done) => {
      chai.request(server)
          .get('api/game/get')
          .end((err, res) => {
            if (err) {
              console.error(err);
              done();
            }
            expect(res.body[0].title).to.equal(testGame.title);
            expect(res.body[0]._id).to.equal(gameId.toString());
            done();
          });
    });
  });

  // test the PUT here
  describe(`[PUT] api/game/update`, () => {
    it('should update game id and title', (done) => {
      const gameUpdate = {
        id: gameId, 
        title: 'Super Mario',
      };
      chai.request(server)
          .put('/api/game/update')
          .send(gameUpdate)
          .end((err, res) => {
            expect(res.body.title).to.equal(gameUpdate.title);
            expect(res.status).to.equal(200);
            done();
          });
    });

    it('should return error and status 422 if there is no title', (done) => {
      const gameUpdate = {
        id: gameId, 
      }; 
      chai.request(server)
          .put('/api/game/update')
          .send(gameUpdate)
          .end((err, res) => {
            if (err) {
              expect(err.status).to.equal(422);
              const { error } = err.response.body;
              expect(error).to.equal('Must Provide a title && Id');
            }
            done();
          });
    });

    it('should send error and status 422 if id not found', (done) => {
      const gameUpdate = {
        title: 'Battlegrounds', 
        id: 20
      };
      chai.request(server)
          .put('/api/game/update')
          .send(gameUpdate)
          .end((err, res) => {
            if (err) {
              expect(err.status).to.equal(422);
              const { error } = err.response.body;
              expect(error).to.equal('Cannot find game by that id');
            }
          });
        done();          
    });
  });

  // --- Stretch Problem ---
  // Test the DELETE here
});