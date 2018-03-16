const mongoose = require("mongoose");
const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const chaihtttp = require("chai-http");

const Game = require("./models");
const server = require("./server");
chai.use(chaihtttp);

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
  let marioGame;

  beforeEach(done => {
    const newGame = new Game({
      title: "California Games",
      genre: "Sports",
      date: "June 1987"
    });

    newGame
      .save()
      .then(game => {
        gameId = game.id.toString();
        marioGame = game;
        done();
      })
      .catch(err => {
        console.error(err);
        done();
      });
  });
  afterEach(done => {
    Game.remove({}, error => {
      if (error) console.error(error);
      done();
    });
  });

  // test the POST here
  describe("[POST] /api/game/create", () => {
    it("should add a new game", done => {
      const myGame = new Game({
        title: "Super Mario Bros.",
        genre: "Action",
        date: "September 1985"
      });
      chai
        .request(server)
        .post("/api/game/create")
        .send(myGame)
        .end((err, res) => {
          expect(res.body.title).to.equal("Super Mario Bros.");
          expect(res.body).to.be.a("object");
          done();
        });
    });
    it("should return a 422 error", done => {
      const myGame = {
        genre: "Sport",
        date: "June 1987"
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
  describe("[GET] /api/game/get", () => {
    it("should return all games in database", done => {
      chai
        .request(server)
        .get("/api/game/get")
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.body).to.be.an("array");
          expect(res.body[0].title).to.equal("California Games");
          expect(res.body[0]._id).to.equal(gameId);
          done();
        });
    });
  });

  // test the PUT here
  describe("[PUT] /api/game/update", () => {
    it("should update game information in the database", done => {
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
