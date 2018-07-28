const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const chaiHTTP = require('chai-http');

const Game = require('./models');
chai.use(chaiHTTP);
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
  let GameId;
  let zeldaGame;

  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` 
    const newGame = new Game({
      title: 'California Games',
      genre: 'Sports',
      date: 'June 1987'
    });
    newGame.save((error, game) => {
      if (error) return done(error);
      gameId = game.id.toString();
      zeldaGame = game;
      done();
    });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove((err) => {
      if (err) return done(err);
      done();
    });
  });

  // test the POST here
  describe(`[POST] /api/game/create`, () => {
    it('should create a new game', done => {
      const myGame = new Game({
        title: 'Zelda',
        genre: 'Action',
        releaseDate: 'September 1985'    
      });
      chai
        .request(server)
        .post('/api/game/create')
        .send(myGame)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.title).to.equal('Zelda');
          expect(res.body).to.be.a("object");
          done();
        });
    });
    it("should return a 422 error", done => {
      const myGame = {
        genre: "Sport",
        releaseDate: "June 1987"
      };
      chai
        .request(server)
        .post("/api/game/create")
        .send(myGame)
        .end((err, res) => {
          if (err) {
            expect(err.status).to.equal(422);
            expect(err.response.body.error).to.equal(
              "Error saving data to the DB"
            );
            done();
          }
        });
    });
  });

  // test the GET here
  describe(`[GET] /api/game/get`, () => {
    it('should give all the games', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(1);
          expect(res.body[0].title).to.equal('California Games');
          expect(res.body[0]._id).to.equal(gameId);
          done();
        });
      });
  });
  
  // test the PUT here
  describe("[PUT] /api/game/update", () => {
    it("should update the game information in the database", done => {
      const updatedGame = {
        id: gameId,
        title: "Cal Games"
      };
      chai
        .request(server)
        .put("/api/game/update")
        .send(updatedGame)
        .end((err, res) => {
          expect(res.body.title).to.equal("Cal Games");
          expect(res.body._id).to.equal(gameId);
          done();
        });
    });
    it("should return a 422 error", done => {
      const updatedGame = {
        id: -1,
        title: "Cal Games"
      };
      chai
        .request(server)
        .put("/api/game/update")
        .send(updatedGame)
        .end((err, res) => {
          if (err) {
            expect(err.status).to.equal(422);
            expect(err.response.body.error).to.equal(
              "Cannot find game by that id"
            );
            done();
          }
        });
    });
  });

  // --- Stretch Problem ---
  // Test the DELETE here
  describe("[DELETE] /api/game/destroy/:id", () => {
    it("should delete game when id is passed as params", done => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${gameId}`)
        .end((err, res) => {
          expect(res.body.success).to.equal(
            `${marioGame.title} was removed from the DB`
          );
          done();
        });
    });
    it("should delete game when id is passed in body", done => {
      const id = {
        id: gameId
      };
      chai
        .request(server)
        .delete("/api/game/destroy/:id")
        .send(id)
        .end((err, res) => {
          expect(res.body.success).to.equal(
            `${marioGame.title} was removed from the DB`
          );
          done();
        });
    });
    it("should return a 422 error", done => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${gameId}354`)
        .end((err, res) => {
          if (err) {
            expect(err.response.body.error).to.equal(
              `Cannot find game by that id`
            );
            expect(err.status).to.equal(422);
            done();
          }
        });
    });
  });
});