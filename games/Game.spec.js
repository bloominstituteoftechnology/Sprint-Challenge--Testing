const mongoose = require('mongoose');

const Game = require('./Game');

describe('The Game Model', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log("\n=== disconnected from TEST DB ==="));
  });

  it("should return the name of the game from its getGameTitle method", async () => {
    const testGame = await Game.create({
      title: "Skiing",
      genre: "Sports",
      releaseDate: "may 2012",
    });

    const { title, genre, releaseDate } = testGame;

    expect(testGame.getGameTitle()).toBe("Skiing");
    expect({ genre, releaseDate, title }).toEqual({
      title: "Skiing",
      genre: "Sports",
      releaseDate: "may 2012",
    });
  });
});