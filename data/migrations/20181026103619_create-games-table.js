exports.up = function(knex, Promise) {
	return knex.schema.createTable('games', function(gamesTable) {
		gamesTable.increments();

		gamesTable.string('title', 128).notNullable();

		gamesTable.string('genre', 64).notNullable();

		gamesTable.integer('releaseYear', 64);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('games');
};
