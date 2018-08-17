exports.up = knex => knex.schema.createTable('genres', (genres) => {
  genres.increments('id');
  genres.string('name').unique();
});

exports.down = knex => knex.schema.dropTableIfExists('genres');
