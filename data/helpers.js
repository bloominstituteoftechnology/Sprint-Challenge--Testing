const db = require('./dbConfig');

module.exports = {
    getAll,
    insert,
};

async function getAll() {
    return db('games');
}

async function insert(game) {
    return db('games').insert(game);
}