const db = require('./data/dbConfig');

module.exports = {
    getAll,
    insert
}

async function getAll() {
    return db('games');
}

async function insert(game) {
    const [ id ] = await db('games').insert(game);
    const addedGame = await db('games').where({ id });

    return addedGame[0];
}