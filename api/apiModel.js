const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
}

function find() {
    return db('games');
}

function findById(id) {
    return db('games')
        .where({ id })
        .first();
}

function add(game) {
    return db('games')
        .insert(game)
        .into('games')
}

function update(id, changes) {
    return db('games')
        .where({ id })
        .update(changes)
}

function remove(id) {
    return db('games')
        .where({ id })
        .del();
}