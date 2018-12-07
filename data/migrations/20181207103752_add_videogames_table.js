exports.up = function(knex, Promise) {
  return knex.schema.createTable('videogames', tbl => {
    tbl.increments();

    tbl
      .string('title', 255)
      .notNullable()
      .unique();
    tbl.string('genre', 255).notNullable();
    tbl.string('releaseYear', 255);
  });
};

exports.down = function(knex, Promise) {
  // undo the operation in up
  return knex.schema.dropTableIfExists('videogames');
};
