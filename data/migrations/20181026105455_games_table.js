
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Games', function(tbl){
    tbl.increments();
    tbl.string('title', 64).notNullable().unique();
    tbl.string('genre', 64).notNullable();
    tbl.integer('releaseYear', 8);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Games')
};
