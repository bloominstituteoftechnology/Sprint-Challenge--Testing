
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', function(table) {
      table.increments();
      table.string('title', 128).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
