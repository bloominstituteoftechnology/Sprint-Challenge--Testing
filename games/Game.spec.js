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
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  it('Returns the title of the correct game name', async () => {
    const fortnite = await Game.create({
      title: "Fortnite",
      genre: "Battle Royale",
      releaseDate: "July 2017"
    });

    const { title, genre, releaseDate } = fortnite;

    expect(fortnite.getGameTitle()).toBe("Fortnite");
    expect({ genre, releaseDate}).toEqual({
      genre: "Battle Royale",
      releaseDate: "July 2017"
    });
  });
});
