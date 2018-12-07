const db = require('./dbinit');

module.exports = {
  get: () => {
    return db('games');
  },
  getById: id => {
    return db('games')
      .where({ id: id })
      .first();
  },
  insert: game => {
    return db('games').insert(game);
  },
  update: (id, game) => {
    return db('games')
      .where({ id })
      .update(game);
  },
  delete: id => {
    return db('games')
      .where({ id })
      .del();
  }
};
