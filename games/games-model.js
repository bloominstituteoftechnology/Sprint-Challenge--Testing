const db = require('../data/dbConfig.js');

module.exports = {
  getGames,
  insert
}

function getGames() {
  return db('games');
}

async function insert(game) {
  const [id] = await db('games').insert(game);
  return db('games').where({ id }).first();
}
