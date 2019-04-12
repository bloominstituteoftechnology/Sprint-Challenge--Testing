const db = require("../data/dbConfig");

 module.exports = {
  insert,
  getAll
};

 async function insert(game) {
  return db("games").insert(game);
}

 async function getAll() {
  return db("games");
}

