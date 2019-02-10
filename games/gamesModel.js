const db = require('../data/dbConfig.js');

 async function insert(game) {
   return db('games').insert(game);
}

 async function getAll() {
   return db('games');
}

function remove(id) {
   return db('games').where('id', id).del();
}
module.exports = {
   insert, getAll
}