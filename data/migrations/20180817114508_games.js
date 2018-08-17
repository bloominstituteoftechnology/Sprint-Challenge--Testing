
exports.up = function(knex, Promise) {
    return knex.schema.createTable('games', function (table) {
        table.increments();
        table.string('title').notNullable();
        table.string('genre').notNullable();
        table.integer('releaseYear');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('games')
};
