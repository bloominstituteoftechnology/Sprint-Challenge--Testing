exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', function(tbl) {
  	tbl.increments();

  	tbl
  		.string('title')
  		.notNullable()
      .unique('title')

  	tbl
  		.string('gengre')
  		.notNullable()

  	tbl
  		.string('releaseYear')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('games')
};