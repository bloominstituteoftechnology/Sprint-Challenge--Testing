const knex = require("knex");
const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

function insert(game) {
  return db("games").insert(game);
}

function get() {
  return db("games");
}

function getGame(id) {
  return db("games").where({ id: id });
}

module.exports = { insert, get, getGame };
