const mongoose = require("mongoose");
const chai = require("chai");
const chaiHTTP = require("chai-http");
const { expect } = chai;
const sinon = require("sinon");
const server = require("./server");
chai.use(chaiHTTP);
const Game = require("./models");

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

  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    let myGame = new Game({
      title: "yasins awesome game",
      date: Date.now,
      genre: "RPG"
    });
    myGame
      .save()
      .then(game => {
        myGame = game;
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
    mongoose.connection.db.dropCollection("games", function(err, result) {
      if (err) {
        console.log("error removing collections, what did you break?");
        done();
      }
      if (result) done();
    });
  });

  // test the POST here

  // test the GET here
  it("should get all bands", done => {
    chai
      .request(server)
      .get("/api/game/get")
      .end((err, res) => {
        if (err) {
          console.log(err);
          done();
        }
        expect(res.status).to.equal(200);
        expect(res.body[0].title).to.equal("yasins awesome game");
        done();
      });
  });
  // test the PUT here

  // --- Stretch Problem ---
  // Test the DELETE here
});
