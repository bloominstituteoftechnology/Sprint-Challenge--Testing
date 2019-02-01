const db = require('../data/dbConfig');

module.exports = {
  getAll,
  insert
};

function getAll() {
  return db('gameTable');
}

async function insert(gamesInfo) {
  return db('gameTable').insert(gamesInfo);
}
