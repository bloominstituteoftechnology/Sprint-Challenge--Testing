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

  it('getGameTitle returns the title for the game', async () => {
    const californiaGames = {
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    };
    const game = await Game.create(californiaGames);
    const title = game.getGameTitle();

    expect(title).toEqual('California Games');
  });

});
