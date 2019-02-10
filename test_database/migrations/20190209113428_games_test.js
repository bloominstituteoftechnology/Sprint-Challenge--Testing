
exports.up = function(knex, Promise) {
    return knex.schema.createTable('GAMES_TEST', table => {
        table.increments();
        table.string('title').notNullable();
        table.string('genre').notNullable();
        table.integer('releaseYear');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('GAMES_TEST')
};
