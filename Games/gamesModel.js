const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  // update,
  // remove,
  // getAll,
  // findById
};

async function insert(game) {
  const { title, genre, releaseYear } = await db('games').insert(game);

  return db('games')
    // .select('*')
    .where({ title, genre })
    .first();
}