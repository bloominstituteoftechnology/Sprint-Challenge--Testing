const db = require('../data/dbConfig');

module.exports = {
  getAll,
  insert,
  getId
};

function getAll() {
  return db('gameTable');
}

async function insert(gamesInfo) {
  return db('gameTable').insert(gamesInfo);
}

async function getId(id) {
  return db('gameTable').where({ id });
}
