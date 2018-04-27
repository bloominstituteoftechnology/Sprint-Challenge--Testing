const mongoose = require("mongoose");
const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const chaiHttp = require("chai-http");
const Game = require("./models");
const server = require("./server");

chai.use(chaiHttp);

describe("Games", () => {
  before(done => {
    
  let gameId;
  beforeEach(done => {
    const newGame = new Game({
      title: "Shaq-Fu",
      genre: "Fighting",
      releaseDate: "October 28, 1994"
    });
    newGame.save((err, savedGame) => {
      if (err) {
        console.log(err);
        return done();
      }
      gameId = newGame._id.toString();
      return done();
    });
  });

  afterEach(done => {
    Game.remove({}, err => {
      if (err) console.log(err);
      return done();
    });
  });

  describe(`[POST] /api/game/create`, () => {
    it('Should save a new game to the database', done => {
      chai
        .request(server)
        .post("/api/game/create")
        .send({
          title: "PaperBoy",
          releaseDate: "1985",
          genre: "Action Game"
        })
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.title).to.equal('Paperoy');
          return done();
        });
    });
  });

  describe(`[GET] /api/game/get`, () => {
    it("Should get a list of all games in the database", done => {
      chai
        .request(server)
        .get("/api/game/get")
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done();
          }
          expect(response.status).to.equal(200);
          expect(response.body[0].title).to.equal('Shaq-Fu');
          expect(response.body).to.be.an('Array');
          return done();
        });
    });
  });

  describe(`[DELETE] /api/game/destroy/:id`, () => {
    it("Should delete a game from the database", done => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${gameId}`)
        .end((err, res) => {
          if (err) {
            console.og(err);
            return done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal('Shaq-Fu was removed from the DB');
          return done();
        });
    });
  });

  // --- Stretch Problem ---
  // test the PUT here
})
});
