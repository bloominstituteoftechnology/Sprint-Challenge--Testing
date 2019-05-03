
exports.up = function(knex, Promise) {
    return knex.schema.createTable('videogames', table => {
        table.increments();
        table.text('title').notNullable();
        table.text('genre').notNullable();
        table.datetime('releaseYear');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('videogames');
};
