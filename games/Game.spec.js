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

  afterEach(() => {
    return Game.remove();
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  it('returns the title with its getGameTitle method', async () => {
    const testGame = {
      title: 'Mario Bros.',
      genre: 'Platform',
      releaseDate: 'June 1986'
    };
    const savedGame = await Game.create(testGame);
    expect(savedGame.getGameTitle()).toBe(testGame.title);
  });
});
