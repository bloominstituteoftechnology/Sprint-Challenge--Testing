exports.up = function(knex, Promise) {
  return knex.schema.createTable("games", tableBuilder => {
    tableBuilder.increments();
    tableBuilder
      .string("title", 255)
      .notNullable()
      .unique();
    tableBuilder.string("genre", 255).notNullable();
    tableBuilder.integer("releaseYear").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("games");
};
