const mongoose = require("mongoose");

const Game = require("./Game");

const game = {
  title: "Super Mario 3",
  genre: "Platforming",
  releaseDate: "October 1988"
};

describe("The Game Model", () => {
  beforeAll(() => {
    return mongoose
      .connect("mongodb://localhost/test")
      .then(() => console.log("\n=== connected to TEST DB ==="))
      .catch(err => {
        console.log("error connecting to TEST database, is MongoDB running?");
      });
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log("\n=== disconnected from TEST DB ==="));
  });

  it("runs the tests", () => {});

  // test away!
  it("Should return a title, genre, and release date", async () => {
    const savedGame = await Game.create(game);

    expect(savedGame.title).toEqual(game.title);
    expect(savedGame.genre).toEqual(game.genre);
    expect(savedGame.releaseDate).toEqual(game.releaseDate);
  });

  it("title, genre, and release date should have a type of string", async () => {
    const savedGame = await Game.create(game);

    expect(typeof savedGame.title).toBe("string");
    expect(typeof savedGame.genre).toBe("string");
    expect(typeof savedGame.releaseDate).toBe("string");
  });
});
