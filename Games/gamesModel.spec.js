const db = require('../data/dbConfig.js');
const allGames = require('./gamesModel');

beforeEach(async () => {
  await db('allGames').truncate();
});


describe('allGames model', () => {
  it('should insert provided game', async () => {

    let rows = await db('allGames').where({ title: 'Pacman', genre: 'Arcade' });
    expect(rows).toHaveLength(0);

    // insert a test record
    await allGames.insert({ title: 'Pacman', genre: 'Arcade' });
    await allGames.insert({ title: 'Pole Position', genre: 'Arcade' });
    await allGames.insert({ title: 'Pharaoh', genre: 'Strategy/Simulation', releaseYear: 1999 });

    // make sure the test record is now in the db
    rows = await db('allGames').where({ title: 'Pacman', genre: 'Arcade' });
    expect(rows).toHaveLength(1);

    rows = await db('allGames');
    expect(rows).toHaveLength(3);
  });

  it('should update a record', () => {
    // insert a record
    // update the record by id = 1
    // check that the record was updated with the new information
  });
});