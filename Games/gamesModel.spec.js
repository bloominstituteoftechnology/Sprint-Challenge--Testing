const db = require('../data/dbConfig.js');
const games = require('./gamesModel');

beforeEach(async () => {
  await db('games').truncate();
});


describe('games model', () => {
  it('should insert provided game', async () => {

    let rows = await db('games').where({ title: 'Pacman', genre: 'Arcade' });
    expect(rows).toHaveLength(0);

    // insert a test record
    await games.insert({ title: 'Pacman', genre: 'Arcade' });
    await games.insert({ title: 'Pole Position', genre: 'Arcade' });
    await games.insert({ title: 'Pharaoh', genre: 'Strategy/Simulation', releaseYear: 1999 });

    // make sure the test record is now in the db
    rows = await db('games').where({ title: 'Pacman', genre: 'Arcade' });
    expect(rows).toHaveLength(1);

    rows = await db('games');
    expect(rows).toHaveLength(3);
  });

  it('should update a record', () => {
    // insert a record
    // update the record by id = 1
    // check that the record was updated with the new information
  });
});