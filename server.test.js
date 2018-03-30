const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const chaiHTTP = require('chai-http');
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
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  
  let gameId = null;
  let testGame = null;
  
  beforeEach(done => {
    const newGame = new Game({
      title: 'Rampage',
      releaseDate: '1776',
      genre: 'Awesome'
    });
    const newerGame = new Game({
      title: 'Duck Hunt',
      releaseDate: '1876',
      genre: 'Shooter'
    });
    newGame
      .save()
      .then(game => {
        testGame = game;
        gameId = game._id;
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
  });
  afterEach(done => {
    Game.remove({}, (err) => {
      if (err) console.error(err);
      done();
    });
    // simply remove the collections from your DB.
  });

  // test the POST here
  describe('[POST]/api/game/create', () => {
    it('should add a new game', (done) => {
      const newGame = {
        title: 'Rampage',
        releaseDate: '1776',
        genre: 'Awesome'
      };
      chai
      .request(server)
      .post('api/game/create')
      .send(newGame)
      .end((err,res) => {
        if (err) {
          console.error(err);
          done();
        }
        assert.equal(res.body.title, 'Rampage');
        done();
      });
    })
  });



//  test the GET here

  describe('[GET] /api/game/get', () => {
    it('should return all the games', done => {
      chai.request(server).get('api/game/get').end((err, res) => {
        if (err) {
          
          done();
        }
        expect(res.body[0].title).to.equal(testGame.title);
        expect(res.body[0]._id).to.equal(gameId.toString());
        done()
      });
    });
  });

  // test the PUT here
 

  

  // --- Stretch Problem ---
  // Test the DELETE here
});
