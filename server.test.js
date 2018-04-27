const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;
const { should } = chai;
const sinon = require('sinon');
const server = require('./server');
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
  let gameId;
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    const newGame = new Game({
      title: 'Super Mario Bros',
      genre: 'Adventure'
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
  });
  newGame.save((err, savedGame) => {
    if (err) {
      console.log(err);
      done();
    }
    gameId = savedGame._id;
    done();
  });
});
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  // test the POST here
  describe(`[POST] /api/game/create`, () => {
    it('should save a game document to the db', done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({ title: 'California Games', genre: 'Sports', releaseDate: 'June 1987' })
        .then(response => {
          done();
        })
        .catch(err => {
          throw err;
          done();
        });
    });
  // test the GET here
  describe(`[GET] /api/game/get`, () => {
    it('should get a list of all the games in db', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('array');
          done();
        });
    });
  });
  // Test the DELETE here
  describe('/api/game/destroy/:id game', () => {
    it('it should DELETE a game given the id', (done) => {
      let game = new Game({title: "Super Mario Bros", genre: "Adventure" })
      game.save((err, game) => {
              chai
              .request(server)
              .delete('/api/game/destroy/' + game.id)
              .end((err, response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.be.an('object');               
                done();
              });
        });
    });
  });
  // --- Stretch Problem ---
  // test the PUT here  
});
});
