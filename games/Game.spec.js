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

  it('should return the game title', async () => {
    const game1 = { title: 'game', genre: 'idontevenknow' };
    const savedGame = await Game.create(game1);
    expect(savedGame.title).toEqual(game1.title);
    expect(savedGame.genre).toEqual(game1.genre);
  });


  // test away!
});
