
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', eachGame => {
      eachGame.increments();
      eachGame.string('Title').notNullable().unique();
      eachGame.string('Genre').notNullable();
      eachGame.integer('Release Year').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
