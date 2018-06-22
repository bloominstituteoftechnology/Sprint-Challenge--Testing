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
  it('should have a title', async () => {
    const game = { title: 'testGame', genre: 'testGenre'};
    const savedGame = await Game.create(game)
    expect(savedGame.title).toEqual('testGame'); 
  })
});
