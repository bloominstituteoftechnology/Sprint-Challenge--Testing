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
  }
};
