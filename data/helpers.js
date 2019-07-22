const db = require('./dbConfig')

function getAll() {
    return db('games');
};

function insert(newGame) {
    return db('games')
        .insert(newGame);
};

module.exports = (getAll, insert)