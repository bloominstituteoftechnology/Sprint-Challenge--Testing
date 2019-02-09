exports.up = function (knex, Promise) {
    return knex.schema.createTable("games", table => {
        table.increments();
        table.string("title", 256).notNullable();
        table.string("genre", 256).notNullable();
        table.integer("releaseYear");
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("games")
};