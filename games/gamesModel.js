const knex = require('knex');
const knexConfig = require('../knexfile.js');

//connection to the data base
const db = knex(knexConfig.development);

module.exports = {
    find, 
    findById,
    add,
    update,
    remove

}

function find() {
    return db('games');
}

function findById(id) {
    return db('games').where({id}).first();
}

function add(course){
    return db('games')
    .insert(course)
    .into('games');
}

function update(id, changes) {
    return db('games').where({id})
    .update(changes)
}

function remove(id) {
    return db('games')
    .where({id})
    .del();
}