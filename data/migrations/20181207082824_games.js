
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', tbl => {
      tbl.increments()
      tbl.text('title').notNullable()
      tbl.text('genre').notNullable()
      tbl.integer('releaseYear').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games')
};
