const db = require("./config/gamesConfig.js");
const table = "games";

module.exports = {
  find,
  findById,
  addGame,
  remove
};

function find() {
  return db(table);
}

function findById(id) {
  return db(table)
    .where({ id })
    .first();
}

function addGame(newGame) {
  return db(table)
    .insert(newGame)
    .into(table);
}

function remove(id) {
  return db(table)
    .where({ id })
    .del();
}
