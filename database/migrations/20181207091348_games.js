exports.up = (knex, Promise) => {
  return knex.schema.createTable('games', tbl => {
    tbl.increments();
    tbl
      .string('title', 128)
      .notNullable()
      .unique();
    tbl.string('genre', 128).notNullable();
    tbl.integer('releaseYear', 128).notNullable();
  });
};

exports.down = (knex, Promise) => knex.schema.dropTableIfExists('games');
