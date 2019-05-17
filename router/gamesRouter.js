const knex = require('knex');
const router = require('express').Router();

const knexConfig = {
	client: 'sqlite3',
	connection: {
		filename: './data/games.db3'
	},
	useNullAsDefault: true
};

const db = knex(knexConfig);

router.get('/', (req, res) => {
	db('games')
		.then((game) => {
			res.status(200).json(game);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.post('/', (req, res) => {
	if (!req.body.title || req.body.genre || req.body.releaseYear) {
		res.status(400).json({ message: 'Please provide title, genre and release year.' });
	} else {
		db('games')
			.insert(req.body)
			.then((game) => {
				res.status(200).json(game);
			})
			.catch((err) => {
				res.status(500).json({ message: 'Error posting game.' });
			});
	}
});

module.exports = router;
