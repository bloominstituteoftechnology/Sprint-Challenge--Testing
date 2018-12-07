exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', function(tbl) {
    // we must use the callback syntax for .createTable()
    tbl.increments(); // pass the game if you wanted to be called anything other than id
    tbl
      .string('title', 255)
      .notNullable();
    tbl
      .string('genre', 255)
      .notNullable();
    tbl
      .integer('releaseYear')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};