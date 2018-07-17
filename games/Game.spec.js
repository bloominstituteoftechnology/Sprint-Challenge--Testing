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

  afterEach(async () => {
    await Game.remove();
  })

  const game = new Game({
    title: 'Mario',
    genre: 'Adventure',
    releaseDate: 'May 1980'
  })

  it('should successfully create a Game model', () => {
    expect(game._id).toBeTruthy();
    expect(game.title).toBe('Mario')
    expect(game.genre).toBe('Adventure')
    expect(game.releaseDate).toBe('May 1980')
  });

  it('should save a game to the database', async () => {
    await Game.create(game);
  })

  it('should return game title when getGameTitle called', () => {
    expect(game.getGameTitle()).toBe('Mario')
  })
});
