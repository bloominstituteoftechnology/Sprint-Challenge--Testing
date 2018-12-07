const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  // update,
  // remove,
  // getAll,
  // findById
};

async function insert(game) {
  // [ 1 ]
  
  const { title, genre, releaseYear } = await db('games').insert(game);

  return db('games')
    .where({ title, genre })
    .first();
}