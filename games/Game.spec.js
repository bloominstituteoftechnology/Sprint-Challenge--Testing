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

  afterEach(() => {
    return Game.remove();
  });

  it('runs the tests', async () => {
    const videoGame = { title: 'game', genre: 'rolePlay' }
    const savedGame = await Game.create(videoGame);

    expect(savedGame.title).toEqual(videoGame.title);
    expect(savedGame.genre).toEqual(videoGame.genre);
  });

  // test away!
});
