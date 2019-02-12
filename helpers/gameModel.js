const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  get,
  find,
  findById,
  getId
};

async function insert(game) {
  return null;
}

async function update(id, changes) {
  return null;
}

async function remove(id) {
  return db('games')
    .where('id', id)
    .del();
}

async function get() {
  return db('games');
}

async function find() {
  return db('games');
}

async function findById(id) {

  let query = db('games');
  if (id) {
    query.where('id', Number(id)).first();
  }
  return query;
}

async function getId(id) {
  let query = db('games');
  if (id) {
    query.where('id', Number(id)).first();
  }
  return query;
}
