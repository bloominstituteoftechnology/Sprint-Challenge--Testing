const db = require('./dbConfig.js')

module.exports = {
    totalList,
    add
}

async function totalList() {
    return db('GAMES_TEST');
}

async function add(game) {
    return db('GAMES_TEST').insert(game);
}