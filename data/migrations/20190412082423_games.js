
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', tbl => {
      tbl.increments();

      tbl.string('title', 256).notNullable();
      tbl.string('genre', 256).notNullable();
      tbl.integer("release year")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists();
};
