
exports.up = function(knex, Promise) {
    return knex.schema.createTable('games', function (table) {
      table.increments();
      table.string('title').notNullable();
      table.string('genre').notNullable();
      table.string('releaseYear');
      table.timestamps();
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
