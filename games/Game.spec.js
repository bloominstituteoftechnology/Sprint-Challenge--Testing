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

  it("runs the tests", () => {});

  // test away!

  it('returns the game object when title is envoked', async () => {
    const game = {
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    }

    const newGame = await Game.create(game);
    
    expect(newGame.getGameTitle()).toBe(game.title);
    expect(typeof newGame.title).toBe('string');
    expect(typeof newGame.genre).toBe('string');
    expect(typeof newGame.releaseDate).toBe('string');
  })
});
