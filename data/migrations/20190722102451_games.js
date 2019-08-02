exports.up = function(knex) {
  return knex.schema.createTable('games', function(table) {
    table.increments();
    table.string('title').notNullable().unique();
    table.string('genre').notNullable();
    table.string('releaseYear');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('games');
};