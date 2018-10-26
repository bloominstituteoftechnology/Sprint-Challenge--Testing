
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', function(tbl) {
    // id
    tbl.increments();

    // title
    tbl.string('title', 128).notNullable();
    tbl.unique('title');

    // genre
    tbl.string('genre', 128).notNullable();

    // releaseYear
    tbl.integer('releaseYear');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
