
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', table =>{
      table.increments();
      table.text('title').notNullable();
      table.text('genre').notNullable();
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('games');
};
