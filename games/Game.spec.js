const mongoose = require('mongoose');

const Game = require('./Game');

describe('The Game Model', () => {

  let gameOneId;
  let gameTwoId;

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

    gameOneId = savedGameOne._id;
    gameTwoId = savedGameTwo._id;
  });

  it('It should return a list of games.', async () => {

    const listofGames = await Game.find({});

    expect(listofGames.length).toBeGreaterThanOrEqual(2);

    const firstGame = await Game.findById(gameOneId);
    const secondGame = await Game.findById(gameTwoId);

    expect(firstGame.title).toEqual('Fortnite');
    expect(firstGame.genre).toEqual('Survival');
    expect(firstGame.releaseDate).toEqual('July 25, 2017');

    expect(secondGame.title).toEqual('God of War 4');
    expect(secondGame.genre).toEqual('Action-adventure');
    expect(secondGame.releaseDate).toEqual('April 20, 2018');
  });

  it('It should correctly update the two games created during testing.', async () => {

    const expectedUpdateOne = { title: 'Grand Theft Auto', genre: 'Action-adventure', releaseDate: 'September 17, 2013' };
    const expectedUpdateTwo = { title: 'Minecraft', genre: 'Sandbox, Adventure, Survival, and World', releaseDate: 'May 17, 2009' };

    await Game.findByIdAndUpdate(gameOneId, expectedUpdateOne);
    await Game.findByIdAndUpdate(gameTwoId, expectedUpdateTwo);

    const newGameOne = await Game.findById(gameOneId);
    const newGameTwo = await Game.findById(gameTwoId);

    expect(newGameOne.title).toEqual(expectedUpdateOne.title);
    expect(newGameOne.genre).toEqual(expectedUpdateOne.genre);
    expect(newGameOne.releaseDate).toEqual(expectedUpdateOne.releaseDate);

    expect(newGameTwo.title).toEqual(expectedUpdateTwo.title);
    expect(newGameTwo.genre).toEqual(expectedUpdateTwo.genre);
    expect(newGameTwo.releaseDate).toEqual(expectedUpdateTwo.releaseDate);
  });

  it('It should delete the two games created during testing.', async () => {

    await Game.findByIdAndRemove(gameOneId);
    await Game.findByIdAndRemove(gameTwoId);

    const deleteCheckOne = await Game.findById(gameOneId);
    const deleteCheckTwo = await Game.findById(gameTwoId);

    expect(deleteCheckOne).toEqual(null);
    expect(deleteCheckTwo).toEqual(null);
  })
});
