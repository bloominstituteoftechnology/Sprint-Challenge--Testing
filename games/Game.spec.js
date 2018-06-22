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

  it('output values should match input values', async () => {
    const game = {
      title: "Super Contra",
      genre: "Run and Gun",
      releaseDate: "January, 1988"
    }

    const newGame = await Game.create(game);

    expect(newGame.title).toEqual(game.title);
    expect(newGame.genre).toEqual(game.genre);
    expect(newGame.releaseDate).toEqual(game.releaseDate);
  });

  // test away!
});
