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

  it('runs the tests', () => {});

  // test away!

  it('should return game title with getGameTitle function', async () => {
    const testGame = {
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    };    
    const saveGame = await Game.create(testGame);
    const gameTitle = saveGame.getGameTitle();

    expect(gameTitle).toEqual('California Games');
  })

  it('should be string type', async () => {
    const testGame = {
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    };    
    const saveGame = await Game.create(testGame);
    const gameTitle = saveGame.getGameTitle();

    expect(typeof gameTitle).toEqual('string');
    expect(typeof saveGame.genre).toEqual('string');
    expect(typeof saveGame.releaseDate).toEqual('string');
  })
});
