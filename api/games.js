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

const gameFilter = (filter) => {
	// magic filter stuff to be implemented here for stretch
	return state.filter((game) => {
		return game.id === filter || game.title == filter || game.genre === filter || game.releaseYear === filter;
	});
};

router.post('/', (req, res, next) => {
	if (req.body.title && req.body.genre) {
		const { title, genre } = req.body;
		const releaseYear = req.body.releaseYear || null;
		const newGame = { id: count, title, genre, releaseYear };
		const doesExist = gameFilter(title);

		if (doesExist.length === 0 || (doesExist[0].title !== title && doesExist.length === 1)) {
			state.push(newGame);
			count++;
			const postedGame = gameFilter(title);
			res.status(201).json({ title: postedGame[0].title });
		} else {
			next(['h405', `Game '${title}' already exists.`]);
		}
	} else {
		next(['h422', 'Missing title or genre property.']);
	}
});

router.get('/', (req, res, next) => {
	res.status(200).json(state);
});

module.exports = router;
