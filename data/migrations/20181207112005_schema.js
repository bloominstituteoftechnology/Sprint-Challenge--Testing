exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', game => {
    game.increments(); // id

    game.string('title', 255).notNullable();
    game.string('genre', 255).notNullable();
    game.integer('releaseYear');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
