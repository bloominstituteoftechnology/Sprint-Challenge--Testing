const mongoose = require('mongoose');

const Game = require('./Game');

describe('The Game Model', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => {})
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  afterEach(async () => {
    await Game.remove();
  })

  const game = new Game({
    title: 'Mortal Kombat',
    releaseDate: '1992',
    genre: 'Fighting'
  })

  it('should successfully create a Game model', () => {
    expect(game._id).toBeTruthy();
    expect(game.title).toBe('Mortal Kombat')
    expect(game.releaseDate).toBe('1992')
    expect(game.genre).toBe('Fighting')
  });

  it('should return title when `getGameTitle` method is called', () => {
    expect(game.getGameTitle()).toBe('Mortal Kombat')
  })

  it('should save a game to the database', async () => {
    await Game.create(game);
  })
});