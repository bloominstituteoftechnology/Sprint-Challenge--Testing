
exports.up = function(knex, Promise) {
return knex.schema.createTable('games', games => {
  games.increments();
  games.string('title').notNullable().unique();
  games.string('genre').notNullable;
  games.string('releaseYear').notNullable;
})
};

exports.down = function(knex, Promise) {
return knex.schema.dropTableIfExists('games')
};
