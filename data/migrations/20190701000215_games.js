
exports.up = function(knex) {
  return knex.schema.createTable('games', (tbl) => {
      tbl.increments();
      tbl.string('title', 255).notNullable();
      tbl.string('genre', 255),
      tbl.integer('releaseYear', 4);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('games');
};
