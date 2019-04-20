const DB = require("../dbConfig");

module.exports = {
  getAll,
  insertGame
};

async function getAll() {
  return DB("games");
}

async function insertGame(game) {
  return DB("games").insert(game);
}
