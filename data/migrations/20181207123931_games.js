exports.up = function(knex, Promise) {
  return knex.schema.createTable("games", game => {
    game.increments();
    game
      .string("title", 255)
      .notNullable()
      .unique();
    game.string("genre", 255).notNullable();
    game.string("releaseYear", 255);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("games");
};
