const db = require('./dbConfig')

module.exports = {getAll, insert}

function getAll() {
    return db('games');
};

function insert(newGame) {
    return db('games')
        .insert(newGame);
};