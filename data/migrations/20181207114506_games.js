exports.up = function(knex, Promise){
	return knex.schema.createTable('games', table => {
		table.increments()

		table.string('title', 128).notNullable().unique()
		table.string('genre', 128).notNullable()
		table.integer('release_year').unsigned()
	})
}

exports.down = function(knex, Promise){
	return knex.schema.dropTableIfExists('games')
}
