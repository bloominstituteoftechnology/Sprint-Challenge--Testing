const mongoose = require('mongoose');
const Game = require('./Game');

const game = { title: 'Lord of the Rings', genre: 'fantasy', releaseDate: 'Nov-1-2001' };

const gameNoTitle = { title: '', genre: 'fantasy', releaseDate: 'Nov-1-2001' };

const gameNoGenre = { title: 'Lord of the Rings', genre: '', releaseDate: 'Nov-1-2001' };

const gameNoReleaseDate = { title: 'Lord of the Rings', genre: 'fantasy', releaseDate: '' };

const emptyGame = { title: '', genre: '', releaseDate: '' };


describe('The Game Model', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  afterAll(async () => {
    const { title } = game;
    await Game.findOneAndDelete(title);
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  it('creates a new game', async () => {;
    const response = await Game.create(game);
    expect(response.title).toEqual(game.title);
    expect(response.genre).toEqual(game.genre);
    expect(response.releaseDate).toEqual(game.releaseDate);
  });

  it('returns the game title when the Game model function getGameTitle is called', async () => {;
    const response = await Game.find(game);
    const title = await response[0].getGameTitle();
    expect(title).toEqual(game.title);
  });

  // it('rejects a new game without a title', async () => {;
  //   const response = await Game.create(gameNoTitle);
  // });
});
