// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './arcade.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
        directory: './main_database/migrations'
    },
    seeds: {
        directory: './main_database/seed'
    },
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './arcade_test.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
        directory: './test_database/migrations'
    },
    seeds: {
        directory: './test_database/seed'
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
