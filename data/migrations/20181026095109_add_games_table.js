exports.up = function(knex, Promise) {
  return knex.schema.createTable("games", table => {
    table.increments().primary();
    table.string("name").notNullable();
    table.string("genre").notNullable();
    table.int("releaseYear");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("games");
};
