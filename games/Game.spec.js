const mongoose = require('mongoose');

const Game = require('./Game');

describe('The Game Model', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/games')
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

  it('It should return the title, genre, and release date of the game.', async () => {
    const fortnite = { title: 'Fortnite', genre: 'Survival', releaseDate: 'July 25, 2017' };
    const godofwar = { title: 'God of War 4', genre: 'Action-adventure', releaseDate: 'April 20, 2018' };

    const savedGameOne = await Game.create(fortnite);
    const savedGameTwo = await Game.create(godofwar);

    expect(savedGameOne.title).toEqual(fortnite.title);
    expect(savedGameOne.genre).toEqual(fortnite.genre);
    expect(savedGameOne.releaseDate).toEqual(fortnite.releaseDate);

    expect(savedGameTwo.title).toEqual(godofwar.title);
    expect(savedGameTwo.genre).toEqual(godofwar.genre);
    expect(savedGameTwo.releaseDate).toEqual(godofwar.releaseDate);

    await Game.deleteOne({ username: fortnite.username });
    await Game.deleteOne({ username: godofwar.username }); 
  });
});
