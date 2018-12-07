const db = require('./data/dbConfig');

module.exports = {
  insert,
  // update,
  // remove,
  // getAll,
  // findById
};

async function insert(game) {
  // [ 1 ]
  const [id] = await db('games').insert(game);

  return db('games')
    .where({ id })
    .first();
}
