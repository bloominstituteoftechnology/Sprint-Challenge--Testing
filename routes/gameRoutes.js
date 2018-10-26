const express	= require('express');
const gameDb	= require('../data/models/gameDb.js');

const router	= express.Router();

// sanity check
router.get('/', (req, res) => res.status(200).json({ message: 'Server is running.' }));

// get list of all the games
router.get('/all', (req, res) => {
	return gameDb
		.get()
		.then(games => res.status(200).json(games))
		.catch(err => res.status(500).json(`Server could not retrieve game information: ${ err }`));
});

module.exports = router;
