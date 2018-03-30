const mongoose = require("mongoose");
const chai = require("chai");
const { expect } = chai;
const chaihttp = require("chai-http");
const sinon = require("sinon");

const Game = require("./models");
const server = require("./server");
chai.use(chaihttp);

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
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  let gameTest = null;
  let gameTestId = null;
  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const gameModel = new Game({
      title: "World Cup",
      genre: "Soccer",
      date: "June 14, 2018"
    });
    gameModel
      .save()
      .then(game => {
        gameTest = game;
        gameTestId = game._id;
        done();
      })
      .catch(err => {
        console.log("Could not save game");
        done();
      });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({}, err => {
      if (err) console.log("Could not remove test data");
      done();
    });
  });

  // test the POST here
  describe("[POST] /api/game/create", () => {
    it("should post a new game model", done => {
      const newGameModel = {
        title: "Chess",
        genre: "game",
        date: "January 17, 2018"
      };
      chai
        .request(server)
        .post("/api/game/create")
        .send(newGameModel)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal("Chess");
          done();
        });
    });
    it("should log out an error message with the status", done => {
      const newGameModel = {
        title: "Bitconneeeeccctttt",
        type: "Scam",
        date: "January 18, 2018"
      };
      chai
        .request(server)
        .post("/api/game/create")
        .send(newGameModel)
        .end((err, res) => {
          if (err) {
            expect(err.status).to.equal(422);
          }
          done();
        });
    });
  });

  // test the GET here
  describe("[GET] /api/game/get", () => {
    it("should show all the games", done => {
      chai
        .request(server)
        .get("/api/game/get")
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body[0].title).to.equal(gameTest.title);
          expect(res.body[0]._id).to.equal(gameTestId.toString());
          done();
        });
    });
  });

  // test the PUT here
  describe("[PUT] /api/game/update", () => {
    it("should update the game", done => {
      const newGameTitle = "Ponzi Scheme";
      const newGameGenre = "Scam";
      const newGameDate = "2018";

      const newGameUpdate = {
        id: gameTestId,
        title: newGameTitle,
        genre: newGameGenre,
        date: newGameDate
      };
      chai
        .request(server)
        .put("/api/game/update")
        .send(newGameUpdate)
        .end((err, res) => {
          expect(res.body.title).to.equal(newGameTitle);
          done();
        });
    });
    it("should return an error if entry doesnt exist", done => {
      const newGameUpdate = {
        id: "xDxDxD",
        title: "Swagger",
        nason: "Doesn't exist",
        date: "!remindmeinayear"
      };
      chai
        .request(server)
        .put("/api/game/update")
        .send(newGameUpdate)
        .end((err, res) => {
          expect(err.status).to.equal(422);
        });
      done();
    });
  });

  // --- Stretch Problem ---
  // Test the DELETE here
});
