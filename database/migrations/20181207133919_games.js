
exports.up = function(knex, Promise) {
    return knex.schema.createTable('games', games => {
         games.increments();
         games.string('title', 255).notNullable().unique();
         games.string('genre', 128).notNullable();
         games.integer('releaseYear', 100);
    })   
 
};

exports.down = function(knex, Promise) {
   knex.schema.dropTableIfExists('games');
};
