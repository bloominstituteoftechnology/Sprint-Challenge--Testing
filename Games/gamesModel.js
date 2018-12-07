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
  const [ title ] = await db('allGames').insert(game);

  return db('allGames')
    .where({ title })
    .first();
}