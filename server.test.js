const mongoose = require('mongoose');
const Game = require('./models');
const server = require('./server');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
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
        title: 'California Games',
        genre: 'Sports',
        date: 'June 1987'
    });
      newGame
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
  });

  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if(err) console.error(err);
      done();
    });
  });

  // test the POST here
describe('[POST] /api/game/create', () => {
  it('should add a new game', done => {
    const newGame = {
      title: 'California Games',
      genre: 'Sports',
      date: 'June 1987'
    };
    chai
      .request(server)
      .post('/api/game/create')
      .send(newGame)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('California Games');
        done();
    });
  });

  it('should send back 422 upon bad data', done => {
    const newGame = {
      title: 'California Games',
      genre: 'Sport',
    };
    chai
      .request(server)
      .post('/api/game/create')
      .send(newGame)
      .end((err, res) => {
        if (err) {
        expect(err.status).to.equal(422);
        const { error } = err.response.body;
        expect(error).to.eql('Invalid input data sent to server');
        done();
        }
      });
  });
});

  // test the GET here
describe('[GET] /api/game/get', () => {
  it('should get all games', done => {
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

  // --- Stretch Problem ---
  // Test the DELETE here
});
