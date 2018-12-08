
exports.up = function(knex) {
  return knex.schema.createTable('games', games => {
    games.increments();

    games
      .string('title', 255)
      .notNullable()
      .unique();
    games.string('genre', 128).notNullable();
    games.integer('releaseYear', 128);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
