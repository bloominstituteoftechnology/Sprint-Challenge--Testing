const knex = require("knex");
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
    getGames,
    addGame,
};

function getGames() {
    return db("games");
}

function addGame(game) {
    return db("games")
        .insert(game)
        .into("games");
}