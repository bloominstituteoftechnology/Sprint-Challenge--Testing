const knex = require("knex");
const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

function insert(game) {
  return db("games").insert(game);
}

function get() {
  return db("games");
}

module.exports = { insert, get };
