const express	= require('express');
const gameDb	= require('../data/models/gameDb.js');

const router	= express.Router();

// return list of all the games
router.get('/', (req, res) => {
	return gameDb
		.get()
		.then(games => {
			if (!games.length) return res.status(404).json({ error: 'No games in the database.' });
			return res.status(200).json(games);
		})
		.catch(err => res.status(500).json(`Server could not retrieve game information: ${ err }`));
});

// insert new game and return that newly inserted game
router.post('/', (req, res) => {
	const game = req.body;
	if (!game.title || !game.genre) {
		return res.status(422).json({ error: 'Game must have title and genre.' });
	}
	return gameDb
		.get()
		.then(games => {
			games.forEach(elem => {
				if (elem.title === game.title) {
					return res.status(405).json({ error: `${ game.title } already exists.` });
				};
			});
			return gameDb
				.insert(game)
				.then(game => res.status(201).json(game))
				.catch(err => res.status(500).json(`Server could not insert new game: ${ err }`));
		})
		.catch(err => res.status(500).json(`Server could not retrieve game information: ${ err }`));
});

module.exports = router;
