
exports.up = function(knex, Promise) {
    knex.schema.createTable('GAMES', table => {
        table.increments();
        table.string('title').notNullable();
        table.string('genre').notNullable();
        table.integer('releaseYear');
    })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('GAMES')
};
