const db = require('./dbConfig')

module.exports = {
    totalList
}

async function totalList() {
    return db('GAMES_TEST');
}