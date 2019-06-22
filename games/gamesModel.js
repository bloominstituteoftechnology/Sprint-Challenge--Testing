const knex = require("knex");

const knexConfig = {
    client: "sqlite3",
    connection: {
        filename: "./data/games.db3"
    },
    useNullAsDefault: true,
    debug: true
}

const db = knex(knexConfig);

module.exports = {
  insert,
  get,
};

function insert(game) {
  return db('games')
    .insert(game, 'id')
    .then(ids => {
      return db('games')
        .where({ id : ids[0] })
        .first();
    });
}

function get() {
  return db('games');
}
