exports.up = (knex, Promise) => knex.schema.createTable('games', (games) => {
  games.increments('id');
  games.string('title').unique();
  games.integer('genreId').references('genres.id');
  games.integer('releaseYear');
});

exports.down = knex => knex.schema.dropTableIfExists('games'); 
