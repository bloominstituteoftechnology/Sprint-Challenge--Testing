
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', tbl => {
      tbl.increments();
      tbl.string('title', 255).notNullable();
      tbl.string('genre', 128).notNullable();
      tbl.integer('releaseYear');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
