
exports.up = function(knex) {
  return knex.schema.createTable('games', tbl => {
    tbl.increments();

    tbl.string('title', 128).notNullable();
    tbl.string('genre', 128).notNullable();
    tbl.integer('releaseYear').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('games');
};
