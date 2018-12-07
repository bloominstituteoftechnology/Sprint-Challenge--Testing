const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
    add,
    getAll
}

function add(game) {
    return db('games')
    .insert(game)
    .returning('id')
}

function getAll() {
    return db('games')
}