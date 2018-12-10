const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  // update,
  // remove,
  getAll,
  findByTitle
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

async function findByTitle(id) {
  return db('videogames')
    .where({ title: String(id) })
    .select('id', 'title', 'genre', 'releaseYear');
}
