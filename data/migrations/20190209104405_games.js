
exports.up = function (knex, Promise) {
    return knex.schema.createTable('games', games => {
        games.increments();
        games.string('title', 128).notNullable().unique();
        games.string('genre', 128).notNullable();
        games.int('releaseDate').notNullable();
    })

};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('games');
};
