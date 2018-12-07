const db = require('../dbConfig.js');

module.exports = {
    getGame,
    getGames,
    addGame,
    removeGame
};

// returns all rows in games table
function getGames() {
    return db('games');
};

// returns row with corresponding id in games table
function getGame(id) {
    return db('games')
        .where( {id: id} );
};

// adds book to table and returns object with new id
function addGame(game) {
    return db('games')
        .insert(game)
        .then(id => { return {id: id[0] }});
};

// remove book from table, return number of records deleted
function removeGame(id) {
    return db('games')
        .where('id', Number(id))
        .del();
};