
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', tbl=>{
    tbl.increments();
    tbl.string('name').notNullable().unique();
    tbl.string('genre').notNullable();
    tbl.integer('year-released');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
