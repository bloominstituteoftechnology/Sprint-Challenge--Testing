const db = require('../data/db.js')

module.exports = { insert, get, remove }

async function insert(game) {
    const [id] = await db('games').insert(game)
    return db('games').where({ id }).first()
}

async function get(id) {
    return id ? db('games').where({ id }).first() : db('games')
}

async function remove(id) {
    return db('games').where({ id }).del()
}