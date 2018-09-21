
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', function(tbl){
    tbl.increments();

    tbl.string('title').notNullable();
    tbl.string('genre').notNullable();
    tbl.integer('releaseYear').notNullable(); 
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
