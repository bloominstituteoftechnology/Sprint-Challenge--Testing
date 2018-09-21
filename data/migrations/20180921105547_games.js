
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', function(tbl){
    tbl.increments();

    tbl.string('title').notNullable().unique();
    tbl.string('genre').notNullable();
    tbl.integer('releaseYear')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
