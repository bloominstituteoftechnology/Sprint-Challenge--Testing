const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  getAll
};

async function insert(game) {
    return null
}

function getAll() {
  return db('games');
}
