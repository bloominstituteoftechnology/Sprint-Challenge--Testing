const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  remove,
  getAll,
  findById,
};

async function insert(game) {
  return db('games').insert(game);
}

async function remove(id) {
  return db('games').where('id', id).del();
}

function getAll() {
  return db('games');
}

function findById(id) {
  return db('games').where('id', id);
}