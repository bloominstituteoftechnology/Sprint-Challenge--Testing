
exports.up = function(knex, Promise) {
    knex.schema.createTable('GAMES_TEST', table => {
        table.increments();
        table.string('title').notNullable();
        table.string('genre').notNullable();
        table.integer('releaseYear');
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('GAMES_TEST')
};
