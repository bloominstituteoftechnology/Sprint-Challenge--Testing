const mongoose = require("mongoose");
const request = require("supertest");
const server = require("./server");
const Game = require("./games/Game");

describe("Games", () => {
  beforeAll(() => {
    return mongoose
      .connect("mongodb://localhost/test")
      .then(() => console.log("\n=== connected to TEST DB ==="));
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log("\n=== disconnected from TEST DB ==="));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const expectedBody = {
      title: "Street Fighter",
      genre: "fighting",
      releaseDate: "1980"
    };
    const game = new Game(expectedBody);
    return game.save().then(game => {
      console.log(game);
    });
  });

  afterEach(() => {
    //   // clear collection.
    Game.remove();
  });

  it("runs the tests", () => {
    const expectedBody = { api: "running!" };

    request(server)
      .get("/")
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.type).toEqual("application/json");
        expect(res.body).toEqual(expectedBody);
      });
  });

  // test the POST here

  // test the GET here

  // Test the DELETE here
});
