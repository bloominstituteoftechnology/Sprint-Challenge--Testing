const mongoose = require('mongoose');

const Game = require('./Game');
let gameId;
let gameTitle;

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

  it('should return a list of games', async () => {
    const gamesArr = await Game.find().then(games => games).catch(err => err);
    
    expect(gamesArr.length).toBeGreaterThan(0);
  });

  it.skip('should create a new game and return that game as a JSON object', async () => {
    const body = { title: 'Game A', genre: 'A', releaseDate: 'Jun 22, 2018' };
    const newGame = await Game.create(body).then(game => game).catch(err => err);
    gameId = newGame._id;
    gameTitle = newGame.title;

    console.log(gameId);
    
    expect(newGame.title).toEqual(body.title);
  });

  it.skip('should delete a game based on the ID and return the game as a JSON object', async () => {
    const deletedGame = await Game.findByIdAndDelete(gameId).then(game => game).catch(err => err);

    expect(deletedGame.title).toEqual(gameTitle);
  });
});
