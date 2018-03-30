const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');
const chaiHTTP = require('chai-http');
const Game = require('./models');

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
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title:'California Games',
      date:'June 1987',
      genre:'Sports',
    });
    newGame
      .save()
      .then(() => {
        done();
      })
      .catch(error => {
        done(error);
      });
    });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove()
    .then(() => {
      done();
    })
      .catch(error => {
        done(error);
      });
  });

  // test the POST here

  // test the GET here
  describe('[GET] /api/game/get', () => {
    it(`should get all games`, done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body[0].title).to.equal('California Games');
          expect(res.body[0].genre).to.equal('Sports');
          done();
        });
    });
  });
  
  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
