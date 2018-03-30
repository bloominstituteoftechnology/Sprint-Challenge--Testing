const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const chaihttp = require('chai-http');
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
  let testGame = null;
  let gameId =null;
  beforeEach(done => {
    const myGame = new Game({
      title: 'VVS',
      genre: 'Sports',
      releaseDate: 'December 1983'
    });
    myGame
    .save()
    .then(game => {
      testGame = game;
      gameId = game._id;
      done();
    })
    .catch(err => {
      console.error(err);
      done();
    });
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err =>{
      if(err) console.error(err);
      done();
    });
  });

  // test the POST here
describe('[POST /api/game/create', () => {
  it('should add a new game', done => {
    const myGame = {
      title: 'Mario',
      genre: 'NS-games',
      releaseDate: 'November 2000'
    };
    chai.request(server)
    .post('/api/game/create')
    .send(myGame)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.title).to.equal('Mario');
      done();
    });
  });
});
  // test the GET here
describe('[GET] /api/game/get', () => {
  it('should get all the games', done => {
    chai.request(server).get('/api/game/get').end((err, res) => {
      if(err) {
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
describe('[PUT] /api/game/update', () => {
  it('should update the based on id', done => {
    const gameUpdate = {
      id: gameId,
      title: 'Manhattan Games',
      genre: 'Sports',
      releaseDate: 'December 1983'
    };
    chai.request(server).put('/api/game/update')
    .send(gameUpdate).end((err, res) => {
      if(err) {
        throw new Error(err);
        done();
      }
      expect(res.body.title).to.equal(gameUpdate.title);
      expect(res.body.genre).to.equal(gameUpdate.genre);
      expect(res.body.releaseDate).to.equal(gameUpdate.releaseDate);
      done();
    });
  });
});
  // --- Stretch Problem ---
  // Test the DELETE here
  describe('[DELETE] /api/game/destroy/:id', () => {
    it('should delete the object based on id', done => {
      const gameDelete = {
        id: gameId,
        title: 'Manhattan Games',
        genre: 'Sports',
        releaseDate: 'December 1983'
      };
      chai.request(server).delete('/api/game/destroy/:id').send(gameDelete).end((err, res) => {
        if(err) {
          console.Error('chai request error: ',err);
          done();
        }
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('Manhattan Games');
        done();
      });
    });
  });
});
