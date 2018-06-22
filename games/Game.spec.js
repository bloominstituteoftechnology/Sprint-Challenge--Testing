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

  it('should return proper title and genre', async () => {
    const newGame = {title: 'Madden18', genre: "SPORTS", releaseDate: "2018"};
    const postGame = await Game.create(newGame);
    expect(postGame.title).toEqual(newGame.title);
    expect(postGame.genre).toEqual(newGame.genre);
    expect(postGame.releaseDate).toEqual(newGame.releaseDate);
  });

  // test away!
});
