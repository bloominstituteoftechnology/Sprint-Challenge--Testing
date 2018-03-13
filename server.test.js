const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const ChaiHTTP = require('chai-http');

const Game = require('./models');

chai.use(ChaiHTTP);

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
      title: 'Dark Souls'
    }).save((err, savedGame) => {
      if (err) {
        console.log(err);
        return done();
      }
      gameId = savedGame.id;
      done();
    });
  });//beforeEach test it needs to create a new instance of a new Game

  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, (err) => {
      if (err) console.log(err);
      done();
    });
  });

  // test the POST here
  describe('[POST] /game/create', ()=> {
    /*not sure if the route is correct like this*/
    it('should add a new game', (done) => {
      const game = {
        title: 'Blood Born',
        genre: '',
        releaseDate: 'March 2015'

      };//so we want to add a new title

      chai.request(server)
        .post('/game/create')
        .send(game)
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Blood Born');
          done();
        });
    });
  });

  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should get all of the games', (done) => {
      chai.request(server)
        .get('/game')
        .end((err, res) => {
          if (err) return console.log(err);
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body.length).to.equal(1);
          done();
        });
    });
  });


  // test the PUT here
  describe('[PUT] /api/game/update', () => {
    it('should update the game document', (done) => {
      const update = {
        id: gameId,
        title: 'Fuck Cheating Exes'
      };
      chai.request(server)
        .pu('/game')
        .send(update)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.title).to.equal('Fuck Cheating Exes');
          done();
        });
    });
 });


  // --- Stretch Problem ---
  // Test the DELETE here
  
});
