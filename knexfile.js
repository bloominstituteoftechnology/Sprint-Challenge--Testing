// Update with your config settings.

module.exports = {
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/dev.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
