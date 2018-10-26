const express	= require('express');
const gameDb	= require('../data/models/gameDb.js');

const router	= express.Router();

// sanity check
router.get('/', (req, res) => res.status(200).json({ message: 'Server is running.' }));

// return list of all the games
router.get('/all', (req, res) => {
	return gameDb
		.get()
		.then(games => res.status(200).json(games))
		.catch(err => res.status(500).json(`Server could not retrieve game information: ${ err }`));
});

// insert new game and return that newly inserted game
router.post('/', (req, res) => {
	const game = req.body;
	if (!game.title || !game.genre) {
		return res.status(422).json({ error: 'Game must have title and genre.' });
	}
	return gameDb
		.insert(game)
		.then(game => res.status(201).json(game))
		.catch(err => res.status(500).json(`Server could not insert new game: ${ err }`));
});

module.exports = router;
