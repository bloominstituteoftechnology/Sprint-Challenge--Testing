const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHTTP = require('chai-http');


const Game = require('./models');
const server = require('./server');
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
  let gameId;
  
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks 
    const newGame = new Game({
      title: "Tester",
      genre: "Test Genre",
      releaseDate: "Test Date"
    });
    newGame
    .save()
    .then(savedGame => {
      gameId = savedGame._id;
      done();
    })
    .catch(err => {
      console.log(err);
      done();
    });
  });

  afterEach(done => {
    Game.remove({}, (err) => {
      if (err) console.log(err);
      done();
    })
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it('should post a new game', (done) => {
      const game = new Game ({
        title: "Post Game",
        genre: "Post Genre",
        releaseDate: "Post Date"
      });
      chai
      .request(server)
      .post('/api/game/create')
      .send(game)
      .end((err, res) => {
        console.log("Response is: ", res.body);
        if (err) return console.log(err);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal("Post Game");
      });
      done();
    });
  });

  // test the GET here
  describe('[GET] /api/game/get', () => {
    it('should return all the games', (done) => {
      chai
      .request(server)
      .get('/api/game/get')
      .end((err, res) => {
        if (err) {
          console.log(err);
          done();
        };
        expect(res.status).to.equal(200);
        expect(res.body[0].title).to.equal("Tester");
        done();
      });
    });
  });
  
  // test the PUT here
  describe('[PUT] /api/game/update', () => {
    it('should update a game', (done) => {
      const update = {
        id: gameId,
        title: "Updated Game"
      }
      chai
      .request(server)
      .put('/api/game/update')
      .send(update)
      .end((err, res) => {
        if (err) {
          console.log(err);
          done();
        }
        expect(res.status).to.equal(200);
        expect(res.body._id).to.equal(update.id.toString());
        expect(res.body.title).to.equal(update.title);
        done();
      });
    });
  })
  
  // --- Stretch Problem ---
  // Test the DELETE here
});
