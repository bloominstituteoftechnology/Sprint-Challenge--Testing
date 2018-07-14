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

  const game = new Game({
    title: 'Hollow Knight',
    releaseDate: 'June 2018',
    genre: 'Metroidvania'
  })

  it('should successfully create a Game model', () => {
    expect(game._id).toBeTruthy();
    expect(game.title).toBe('Hollow Knight')
    expect(game.releaseDate).toBe('June 2018')
    expect(game.genre).toBe('Metroidvania')
  });

  it('should return title when `getGameTitle` method is called', () => {
    expect(game.getGameTitle()).toBe('Hollow Knight')
  })
});
