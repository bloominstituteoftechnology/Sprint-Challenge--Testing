const mongoose = require("mongoose");
const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");

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
    new Game({
      title: "California Games",
      genre: "Sports",
      date: "June 1987"
    }).save((err, game) => {
      if (err) {
        console.log(err);
        return done();
      }
      gameId = game.id;
      done();
    });
  });
  // write a beforeEach hook that will populate your test DB with data
  // each time this hook runs, you should save a document to your db
  // by saving the document you'll be able to use it in each of your `it` blocks
});
afterEach(done => {
  Game.remove({}, err => {
    if (err) console.log(err);
    done();
  });
});

// test the POST here
describe("[POST] /game", () => {
  it("should add a new game", done => {
    const game = {
      name: "California Games"
    };

    chai
      .request(server)
      .post("/game")
      .send(game)
      .end((err, res) => {
        if (err) return console.log(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal("California Games");
        done();
      });
  });
});
// test the GET here
describe('[GET] /game', () => {
  it('should get all of the game', (done) => {
    chai.request(server)
      .get('/game')
      .end((err, res) => {
        if (err) return console.log(err);
        expect(res.status).to.equal(200);
        expect(Array.isArray(res.body)).to.equal(true);
        expect(res.body.length).to.equal(1);
        done();
      });
  });
});
// test the PUT here
describe('[PUT] /game', () => {
  it('should update the game document', (done) => {
    const update = {
      id: gameId,
      name: ''
    };
    chai.request(server)
      .put('/game')
      .send(update)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.name).to.equal('');
        done();
      });
  });
});
// --- Stretch Problem ---
// Test the DELETE here
