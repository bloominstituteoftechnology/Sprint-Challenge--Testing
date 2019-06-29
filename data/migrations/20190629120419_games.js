
exports.up = function(knex) {
    return knex.schema.createTable('games', tbl => {
        tbl.increments();

        tbl.string('title').notNullable().unique();
        tbl.string('genre').notNullable();

        tbl.int('releaseYear');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('games');
};
