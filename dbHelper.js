const knex = require('knex');
const dbConfig = require('./knexfile.js');
const db = knex(dbConfig.development);

module.exports = {
    retrieve: (games) => {
        return db('games')
    },

    add: (game) => {
        return db('games').insert(game)
    },
};