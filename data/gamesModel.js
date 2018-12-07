const db = require('../data/db.js')

module.exports = { insert, unique, get, remove }

async function insert(game) {
    const [id] = await db('games').insert(game)
    return db('games').where({ id }).first()
}

async function unique(title) {
    let duplicates = await db('games').where({ title })
    return duplicates.length
}

async function get(id) {
    return id ? db('games').where({ id }).first() : db('games')
}

async function remove(id) {
    return db('games').where({ id }).del()
}