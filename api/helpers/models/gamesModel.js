// intialize knex & database
const knex = require('knex');
const db = require('../../../dbConfig'); // intialize database

/* Functions for database searching, to be exported. */

// CREATE
const add = (newGame) => {
    return db('games')
        .insert(newGame)
        .into('games');
}

// READ
const find = () => {
    return db('games');
}

/* Module exports for use in routers */
module.exports = {
    // CRUD operation exports
        add, // [x] logic for CREATE/post
        find, // [x] logic for READ/get
}