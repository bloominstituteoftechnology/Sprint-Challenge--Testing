const db = require('../data/dbConfig.js');
const videogames = require('./videogamesModel');

beforeEach(async () => {
  await db('videogames').truncate();
});

describe('videogame model', () => {
  it('should insert provided videogame', async () => {
    // make sure the the test record is not in the db
    let rows = await db('videogames').where({ title: 'Pacman', genre: 'Arcade', releaseYear: '1980' });
    expect(rows).toHaveLength(0);

    // insert a test record
    await videogames.insert({ title: 'Pacman', genre: 'Arcade', releaseYear: '1980' });
    await videogames.insert({ title: 'Galaga', genre: 'Arcade', releaseYear: '1981' });

    // make sure the test record is now in the db
    rows = await db('videogames').where({ title: 'Pacman', genre: 'Arcade', releaseYear: '1980' });
    expect(rows).toHaveLength(1);

    rows = await db('videogames');
    expect(rows).toHaveLength(2);
  });

  it('should update a record', () => {
    // insert a record
    // update the record by id = 1
    // check that the record was updated with the new information
  });
});
