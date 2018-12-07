exports.up = function(knex, Promise) {
  return knex.schema.createTable("games", function(tbl) {
    tbl.increments();
    tbl.string("title", 120).notNullable();
    tbl.string("genre", 120).notNullable();
    tbl.integer("releaseYear");
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("games");
};
