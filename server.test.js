const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');
const chaiHttp = require("chai-http");

const Game = require('./models');

chai.use(chaiHttp);

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
      new Game ({ 
        title: "",
        genre: "",
        releaseDate: "",
      })
        .save((err, savedGame) => {
          if (err) {
            return "There has been an error saving game data.";
            done();
          } else {
            gameId = savedGame.id;
            return "Game successfully saved.";
            done();
          }
        })
  });

  afterEach(done => {
    Game
      .remove({}, err => {
        if (err) {
          return "Game could not be removed.";
          done();
        } else {
          return "Game removed successfully.";
          done();
        }
      })
  });

  // test the POST here
  describe(`[POST] /api/game/create`, () => {
    it('should save a new game to the database', (done) => {
      const newGame = {
        title: "",
        genre: "",
        releaseDate: "",
      }
    })
    chai
      .request(server)
      .put('/api/game/create')
      .send(newGame)
      .end((err, res) => {
        if (err) {
          return "There was an error with POST request.";
        } else {
          expect(res.status).to.equal(201);
          expect(res.body.title).to.be.a('string');
          expect(res.body.genre).to.be.a('string');
          expect(res.body.releaseDate).to.be.a('string');
          done();
        }
      })
  })

  // test the GET here

  // Test the DELETE here
  
  // --- Stretch Problem ---
  // test the PUT here
});
