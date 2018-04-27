const mongoose = require("mongoose");
const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const server = require("./server");
const Game = require("./models");
const chaiHTTP = require("chai-http");
chai.use(chaiHTTP);

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
      mongoose.connection.close(err => {
        if (err) {
          console.log(err);
        }
        done();
      });
      console.log("we are disconnected");
    });
  });
  let gameId;
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    let game = new Game({
      title: "Don't Starve",
      genre: "Survival",
      releaseDate: "December 2012"
    });
    game
      .save()
      .then(savedGame => {
        gameId = savedGame._id.toString();
        console.log("Game ID: ", gameId);
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });

    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log(err);
      return done();
    });
  });
  describe(`[GET] /api/game/get`, () => {
    it("should return a list of games", done => {
      chai
        .request(server)
        .get("/api/game/get")
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }

          expect(response.status).to.equal(200);
          expect(response.body).to.be.an("array");
          expect(response.body[0].title).to.equal("Don't Starve");
          expect(response.body[0].genre).to.equal("Survival");
          expect(response.body[0].releaseDate).to.equal("December 2012");
          return done();
        });
    });
    it("should return an error if given a bad URL", done => {
      chai
        .request(server)
        .get("/api/games/get")
        .end((err, response) => {
          // if (err) {
          //   console.log(err);
          // }
          expect(response.status).to.equal(404);
          done();
        });
    });
  });
  describe(`[POST] /api/game/create`, () => {
    let game = {
      title: "California Games",
      genre: "Sports",
      releaseDate: "June 1987"
    };
    it("should add a game to the database and return a the new game", done => {
      chai
        .request(server)
        .post("/api/game/create")
        .send(game)
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an("object");
          expect(response.body.title).to.equal("California Games");
          expect(response.body.genre).to.equal("Sports");
          expect(response.body.releaseDate).to.equal("June 1987");

          return done();
        });
    });
    it("should return an error if given a bad URL", done => {
      chai
        .request(server)
        .get("/api/games/created")
        .end((err, response) => {
          // if (err) {
          //   console.log(err);
          // }
          expect(response.status).to.equal(404);
          done();
        });
    });
    it("should return an error if not given a title, genre, and releaseDate", done => {
      chai
        .request(server)
        .post("/api/game/create")
        .send({ bad: "Data" })
        .end((err, response) => {
          // if (err) {
          //   console.log("Error inside the if test: ", err);
          // }
          expect(response.status).to.equal(422);
          done();
        });
    });
  });
  describe(`[PUT] /api/game/update`, () => {
    it("should return a status of 200", done => {
      let updatedGame = {
        title: "Don't Starve Together",
        id: gameId
      };
      chai
        .request(server)
        .put(`/api/game/update`)
        .send(updatedGame)
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an("object");
          expect(response.body.title).to.equal("Don't Starve Together");

          return done();
        });
    });
    it("should return an error if given a bad URL", done => {
      chai
        .request(server)
        .get("/api/games/updat")
        .end((err, response) => {
          // if (err) {
          //   console.log(err);
          // }
          expect(response.status).to.equal(404);
          done();
        });
    });
  });
  describe(`[DELETE] /api/game/destroy/id`, () => {
    it("should return a status of 200", done => {
      chai
        .request(server)
        .delete(`/api/game/destroy/${gameId}`)
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an("object");
          expect(response.body.success).to.equal(
            "Don't Starve was removed from the DB"
          );

          return done();
        });
    });
    it("should return an error if given a bad URL", done => {
      chai
        .request(server)
        .get("/api/games/destro")
        .end((err, response) => {
          // if (err) {
          //   console.log(err);
          // }
          expect(response.status).to.equal(404);
          done();
        });
    });
  });
});
