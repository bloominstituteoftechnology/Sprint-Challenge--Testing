const mongoose = require("mongoose");

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
    const zelda = new Game({
      title: "The Legend of Zelda",
      genre: "Action-Adventure",
      releaseDate: "1986"
    });

    zelda
      .save()
      .then(game => {
        gameId = game._id.toString();
      })
      .catch(error => {
        console.log(error)
      })
  });

  afterEach(() => {
    //   // clear collection.
    Game.remove()
  });

  it("runs the tests", () => {});

  // test the POST here

  // test the GET here

  // Test the DELETE here
});
