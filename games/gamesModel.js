const db = require('../data/dbConfig.js');

module.exports = {
    insert,
    add,
    update,
    remove,
    get,
    getAll,
    findById,
};

async function insert(games) {
    const [id] = await db('games').insert(games, 'id')

    return db('games')
    .where({id}, 'id', 'title', 'genre')
    .first()
}


async function add(games) {
    const [id] = await db('games').insert(games, 'id')

    return db('games')
    .where({id}, 'id', 'title')
    .first()
}

async function update(id, changes) {
    return null;
}

async function remove(id) {
    return db('games')
    .where( 'id', Number(id) )
    .del()
}

function getAll() {
    return db('games');
}

function get() {
    return db(['games'])
}

function findById(id) {
    return null;
}