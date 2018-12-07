exports.up = function(knex, Promise) {
    return knex.schema.createTable('games', tbl => {
        tbl.increments();
        tbl.string('title', 240).notNullable().unique();
        tbl.string('genre', 120).notNullable();
        tbl.integer('releaseYear').notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('games');
};