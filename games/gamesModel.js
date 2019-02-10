const db = require('../data/dbConfig.js');

 function insert(game) {
   return db('games').insert(game);
}

 function getAll() {
   return db('games');
}

module.exports = {
   insert, getAll
}