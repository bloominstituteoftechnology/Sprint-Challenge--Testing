
exports.up = function (knex, Promise) {
    return knex.schema.createTable('games', table => {
        table.increments();
        table.string('title').notNullable();
        table.string('genre').notNullable();
        table.string('releaseYear')

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('games');
};

