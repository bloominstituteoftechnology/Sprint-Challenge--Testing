const db = require('../dbConfig.js');

module.exports = {
    getGames,
    addGame
};

// returns all rows in games table
function getGames() {
    return db('games');
};

// adds book to table and returns object with new id
function addGame(game) {
    return db('games')
        .insert(game)
        .then(id => { return {id: id[0] }});
};