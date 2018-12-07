module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/testing.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    }
  }
};
