const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  // update,
  // remove,
  // getAll,
  // findById
};

async function insert(game) {
  // con[st { title, genre, releaseYear } = await db('games').insert(game);
  const [title] = await db('games').insert(game);

  return db('games')
    .select('*')
    .where({ title })
    .first();
}