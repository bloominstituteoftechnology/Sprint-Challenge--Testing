const db = require('./data/dbConfig.js')

module.exports = {
    insert
}

async function insert(game) {
    const [ id ] = await db('games').insert(game)

    return db('games').where({ id }).first()
}