const mongoose = require("mongoose");

const Game = require("./games/Game");

const faker = describe("Games", () => {
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
    const game = { title: "Starcraft", genre: "RTS", releaseDate: "1998" };
    const newGame = await User.create(game); // new + save
  });

  afterEach(() => {
    //   // clear collection.
    return Game.remove();
  });

  it("runs the tests", () => {});

  // test the POST here

  // test the GET here

  // Test the DELETE here
});
