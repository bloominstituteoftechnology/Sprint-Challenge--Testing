const mongoose = require("mongoose");

const Game = require("./Game");

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

  it("should return the name of the game from its getGameTitle method", async () => {
    const testGame = await Game.create({
      genre: "Platformer",
      releaseDate: "March 1993",
      title: "Kirby's Adventure"
    });

    const { genre, releaseDate, title } = testGame;

    expect(testGame.getGameTitle()).toBe("Kirby's Adventure");
    expect({ genre, releaseDate, title }).toEqual({
      genre: "Platformer",
      releaseDate: "March 1993",
      title: "Kirby's Adventure"
    });
  });

  // test away!
});
