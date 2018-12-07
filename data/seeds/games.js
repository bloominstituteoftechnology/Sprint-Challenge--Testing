exports.seed = function(knex, Promise){
	// Deletes ALL existing entries
	return knex('games').truncate().then(function(){
		// Inserts seed entries
		return knex('games').insert([
			{ title: 'game1', genre: 'genreA', release_year: 2000 },
			{ title: 'game2', genre: 'genreB' },
			{ title: 'game3', genre: 'genreC', release_year: 1987 },
			{ title: 'game4', genre: 'genreD', release_year: 1995 },
			{ title: 'game5', genre: 'genreE', release_year: 2005 },
			{ title: 'game6', genre: 'genreF', release_year: 1978 },
			{ title: 'game7', genre: 'genreG', release_year: 2010 },
			{ title: 'game8', genre: 'genreH', release_year: 1999 },
		])
	})
}
