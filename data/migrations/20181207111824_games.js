exports.up = function(knex) {
    return knex.schema.createTable('games', games => {
      games.increments();
  
      games
        .string('title', 128)
        .notNullable()
        .unique();
      games.string('genre', 128).notNullable();
      games.float('release year', 128);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('games');
  };