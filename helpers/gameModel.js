const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
  get
};

async function insert(game) {
  return null;
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

function getAll() {
  return db('games');
}

/* function findById(id) {
  return null;
} */

function find() {
    return db('games');
  }
  
  function findById(id) {
    return db('games').where({ id: Number(id) });
  }

  function get(id) {
    let query = db('games');
    if (id) {
      query.where('id', Number(id)).first();
      console.log("id:", id)
    }

    return query;
  }
