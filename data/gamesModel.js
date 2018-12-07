const db = require('./dbConfig');

module.exports = {
    insert,
    getAll,
    getById,
    remove
}

async function insert(game) {
    const [id] = await db('games').insert(game);

    return db('games')
    .where({ id })
    .first();
}

function getAll() {
    return db('games');
}

async function getById(id) {
    return await db('games').where('id', id).first();
}

async function remove(id) {
    return await db('games').where('id', id).first().del();
}