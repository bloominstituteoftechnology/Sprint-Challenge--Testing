const db = require("../data/dbConfig.js");

module.exports = {
  fetch: () => {
    return db("games");
  },
  insert: game => {
    return db("games").insert(game);
  }
};
