const express = require('express');

const router = express.Router();

let count = 0;
let state = [
	// {
	// 	id: 0,
	// 	title: 'Pacman', // required
	// 	genre: 'Arcade', // required
	// 	releaseYear: 1980 // not required
	// }
];

router.post('/', (req, res, next) => {
	if (req.body.title && req.body.genre) {
		const { title, genre } = req.body;
		const releaseYear = req.body.releaseYear || null;
		const newGame = { id: count, title, genre, releaseYear };
		state.push(newGame);
		count++;
		const postedGame = state.filter((game) => game.title === title)[0].title;
		res.status(201).json({ title: postedGame });
	} else {
		next(['h422', 'Missing title or genre property.']);
	}
});

router.get('/', (req, res, next) => {});

module.exports = router;
