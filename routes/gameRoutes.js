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
		.catch(err => res.status(500).json({ error: `Server could not retrieve game information: ${ err }`}));
});

// return game with given id
router.get('/:id', (req, res) => {
	const { id } = req.params;
	return gameDb
		.get(id)
		.then(game => {
			if (!game.length) {
				return res.status(404).json({ error: `Game with id ${ id } does not exist.` });
			}
			return res.status(200).json(game);
		})
		.catch(err => res.status(500).json({ error: `Server could not retrieve game information: ${ err }`}));
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
				.catch(err => res.status(500).json({ error: `Server could not insert new game: ${ err }`}));
		})
		.catch(err => res.status(500).json({ error: `Server could not retrieve game information: ${ err }`}));
});

// delete game with given id
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	return gameDb
		.remove(id)
		.then(del => {
			if (del) {
				return res.status(200).json({ message: `Game with id ${ id } successfully deleted.` });
			}
			return res.status(404).json({ error: `Game with id ${ id } does not exist.` });
		})
		.catch(err => res.status(500).json({ error: `Server could not delete game: ${ err }`}));
});

module.exports = router;
