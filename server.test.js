const mongoose = require("mongoose");
const chai = require("chai");
const { expect, assert } = chai;
const sinon = require("sinon");
const server = require("./server");
const Game = require("./models");
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe("Games", () => {
  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/test");
    const db = mongoose.connection;
    db.on("error", () => console.error.bind(console, "connection error"));
    db.once("open", () => {
      console.log("we are connected");
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log("we are disconnected");
    });
  });
  let gameId;
  let outerGame;
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
      title: "Master Blaster",
      genre: "Platformer",
      releaseDate: "1988"
    });
    newGame.save((err, savedGame) => {
      if (err) {
        console.log(err);
        return done();
      }
      gameId = savedGame._id.toString();
      outerGame = newGame;
      done();
    });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log(err);
      return done();
    });
  });

  // test the POST here
  describe("POST a new game in database using /api/game/create", () => {
    it("should add a new game to the DB.", done => {
      // const games = Game.find({});
      chai.request(server)
      .post('/api/game/create')
      .send(outerGame)
      .end((err, response) => {
        if (err) {
          console.log(err);
          return done();
        }
        expect(response.status).to.equal(200);
        expect(response.body.title).equal("Master Blaster");
        expect(response.body.genre).to.equal("Platformer");
        expect(response.body.releaseDate).equal("1988");
        return done();
      });
    });
  });

  // test the GET here
  describe('GET to /api/game/get', () => {
    it('should get a list of all games in the DB', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((err, response) => {
          if(err){
            console.log(err);
            return done();
          }
          expect(response.status).equal(200);
          expect(response.body[0].title).equal('Master Blaster');
          return done();
        })
    })
  })
  // Test the DELETE here
  describe('DELETE to /api/game/destroy/:id', () => {
    it('should delete a game with a specific ID', done => {
      chai
        .request(server)
        // console.log('server===:', server)
        .delete(`/api/game/destroy/${gameId}`)
        .end((err, response) => {
          if(err){
            console.log('error', err)
            return done();
          }
          // console.log(response.status);
          expect(response.res.body.success).equal('Master Blaster was removed from the DB');
          expect(response.status).equal(200);
          return done()
        })
    })
  })
  // --- Stretch Problem ---
  // test the PUT here
  describe('PUT to /api/game/update', () => {
    it('should update a game with a specific ID', done => {
      chai
        .request(server)
        .put('/api/game/update')
        .send({title: "Dabbing Dogs", id: gameId})
        .end((err, response) => {
          if(err){
            console.log('error', err)
            return done();
          }
          expect(response.body.title).equal('Dabbing Dogs')
          expect(response.body._id).equal(gameId)
          expect(response.status).equal(200)
          // console.log(response);
          return done();
        })
    })
  })
});
