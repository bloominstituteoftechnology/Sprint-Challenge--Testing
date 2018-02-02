const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

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
  let gameId;

  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    new Game({
      title: 'The Legend of Zelda',
      genre: 'action-adventure',
      date: 'November 21, 1991'
    }).save((err, savedGame) => {
      if (err) {
        console.log(err);
        // return done();
      }
      gameId = savedGame.id;
      done();
    });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, (err) => {
      done();
    });
  });

  // test the POST here
  describe('[POST]/api/game/create', () => {
    it('should create a new game', (done) => {
      const game = {
        title: 'Super Mario World',
        genre: 'platform',
      }
      chai.
        request(server)
        .post('/api/game/create')
        .send(game)
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Super Mario World');
          expect(res.body.genre).to.equal('platform');
          done();
        })
    })
  })

  // test the GET here
  describe('[GET]/api/game/get', (req, res) => {
    it('should get all games', (done) => {
      chai.request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(1);
          expect(res.body[0].title).to.equal('The Legend of Zelda');
          done();
        })
    })
  })

  // test the PUT here
  describe('[PUT]/api/game/update', () => {
    it('should update game entry based on id', (done) => {
      const update = {
        id: gameId,
        title: 'Super Mario World'
      };
      chai.request(server)
        .put('/api/game/update')
        .send(update)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.title).to.equal('Super Mario World');
          done();
        });
    });
  })
  // --- Stretch Problem ---
  // Test the DELETE here
});
