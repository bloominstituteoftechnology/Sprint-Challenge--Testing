const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

const Game = require('./models');

describe('Games', () => {
  before((done) => {
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

  let testGameID = null;
  let testGame = null;
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  beforeEach((done) => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: 'Final Fantasy',
      genre: 'RPG',
      releaseDate: '1990',
    });
    newGame
      .save()
      .then((game) => {
        testGame = game;
        testGameID = game._id;
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
  });
  afterEach((done) => {
    // simply remove the collections from your DB.
    Game.remove({}, (err) => {
      if (err) console.error(err);
      done();
    });
  });

  describe(`[GET] /api/game/get`, () => {
    it('should return all games', (done) => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.body[0].name).to.eql(testGame.name);
          expect(res.body[0]._id).to.equal(testGameID.toString());
          done();
        });
    });
    it('should return status 200 on successful get', (done) => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            console.log('FIRING');
            console.error(err);
            done();
          }
          console.log('Poop', res);
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  describe('[POST] /api/game/create', () => {
    it('should create a new game with provided information', (done) => {
      const newGame = {
        title: 'California Games',
        genre: 'Sports',
        date: 'June 1987',
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          expect(res.body.title).to.equal('California Games');
          done();
        });
    });
    it('should return a status 201 on successful post', (done) => {
      const newGame = {
        title: 'California Games',
        genre: 'Sports',
        date: 'June 1987',
      };
      chai
        .request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.status).to.equal(201);
          done();
        });
    });
  });
  describe('[PUT] /api/game/update', () => {
    it('should update the game with the provided information at the given id', (done) => {
      const updatedGame = {
        title: 'Battle Toads',
        id: testGameID,
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
          expect(res.body.name).to.equal(updatedGame.name);
          done();
        });
    });
  });
  describe('[DELETE] /api/game/destroy/:id', () => {
    it('should delete the game with the provided information at the given id', (done) => {
      const gameToDelete = {
        id: testGameID.toString(),
      };
      chai
        .request(server)
        .delete('/api/game/destroy/' + gameToDelete.id)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          expect(res.body.success).to.equal(
            `${testGame} was removed from the DB`
          );
          done();
        });
    });
    it('should not delete a game at an invalid id', (done) => {
      const gameToDelete = {
        id: '5abe7880a10b6a585c02844b',
      };
      chai
        .request(server)
        .delete('/api/game/destroy/' + gameToDelete.id)
        .end((err, res) => {
          if (err) {
            console.error(err);
            done();
          }
          console.log("RESBODY", res.body)
          expect(res.body.success).to.equal('null was removed from the DB');
          done();
        });
    });
  });
});
