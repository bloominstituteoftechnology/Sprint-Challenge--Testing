const db = require('../data/dbConfig.js');

module.exports = {
    getAll,
    insert,
    getGameByFilter,
    getById
};

function getAll() {
    return db('games');
}

async function insert(game) {
    const [id] = await db('games').insert(game);
    return getById(id);
}

function getGameByFilter(filter) {
    return db('games').where(filter).first();
}

function getById(id) {
    return db('games'). where({ id }).first();
}