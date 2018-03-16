const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const chaihttp = require('chai-http');
const sinon = require('sinon');

const Game = require('./models');

const server = require('./server');
chai.use(chaihttp);

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
  let testGame1 = null;
  let testGame1_id = null;

  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const game1 = new Game({
      title: 'Superbowl',
      genre: 'Sports',
      date: 'February 2018'
    });
    game1.save()
      .then(game => {
        testGame1 = game;
        testGame1_id = game._id;
        done();
      })
      .catch(err => {
        console.error('Error saving game1');
        done();
      });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.error('Error removing test data');
      done();
    });
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should add a new Game', (done) => {
      const newGame = {
        title: 'Chess',
        genre: 'Board Game',
        date: '6th Century'
      };
      chai.request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Chess');
          done();
        });
    });
    it('should send back a 422 for bad data', (done) => {
      const newGame = {
        title: 'Chess',
        type: 'Board Game',
        date: '6th Century'
      };
      chai.request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((err, res) => {
          if (err) {
            expect(err.status).to.equal(422);
          }
          done();
        });
    });
  });

  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should return all games in database', (done) => {
      chai.request(server)
        .get('/api/game/get')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body[0].title).to.equal(testGame1.title);
          expect(res.body[0]._id).to.equal(testGame1_id.toString());
          done();
        });
    });
  });

  // test the PUT here
  describe('[PUT] /api/game/update', () => {
    it('should update a game in database', (done) => {
      const updatedGameTitle = 'Biathlon';
      const updatedGameGenre = 'Olympic';
      const updatedGameDate = '2018'
      const updatedGame = {
        id: testGame1_id,
        title: updatedGameTitle,
        genre: updatedGameGenre,
        date: updatedGameDate
      };
      chai.request(server)
        .put('/api/game/update')
        .send(updatedGame)
        .end((err, res) => {
          expect(res.body.title).to.equal(updatedGameTitle);
          done();
        });
    });
    it('should return a status of 422 for a nonexistant game', (done) =>{
      const updatedGame = {
        id: -1,
        title: 'The Game',
        type: 'This type',
        date: 'Tomorrow'
      };
      chai.request(server)
        .put('/api/game/update')
        .send(updatedGame)
        .end((err, res) => {
          expect(err.status).to.equal(422);
        });
        done();
    });
  });

  // --- Stretch Problem ---
  // Test the DELETE here
});
