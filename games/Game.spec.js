const mongoose = require('mongoose');
const Game = require('./Game');

const game = { title: 'Lord of the Rings', genre: 'fantasy', releaseDate: 'Nov-1-2001' }

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

  it('creates a new user', async () => {;
    const newGame = await Game.create(game);
    expect(newGame.title).toEqual(game.title);
    expect(newGame.genre).toEqual(game.genre);
    expect(newGame.releaseDate).toEqual(game.releaseDate);
  });
});
