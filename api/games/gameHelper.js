// DEPENDENCIES
// ==============================================
const db = require('../../database/dbConfig');

// AUTH MIDDLEWARE
// ==============================================
module.exports = {
  get: function(id) {
    let query = db('games');
    if (id) query.where('id', Number(id)).first();
    return query;
  },
  checkTitle: function(title) {
    return db('games')
      .where('title', title)
      .first();
  },
  addGame: function(game) {
    return db('games')
      .insert(game)
      .then(ids => ({ id: ids[0] }));
  }
};
