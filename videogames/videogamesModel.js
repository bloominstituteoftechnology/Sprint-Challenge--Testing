const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  // update,
  // remove,
  getAll
  // findById
};

async function insert(videogame) {
  // [ 1 ]
  const [id] = await db('videogames').insert(videogame);

  return db('videogames')
    .where({ id })
    .first();
}

async function getAll() {
  return db('videogames');
}
