const db = require('../database/dbConfig');

const get = username => {
    return db('users')
        .where({ username })
        .first();
};

const add = user => {
    return db('users').insert(user);
};

module.exports = {
    get,
    add
};