const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

// get games
server.get('/games', (req, res) => {
	db('games')
		.then(games => {
			res.status(200).json(games);
		})
		.catch(err => res.status(500).json(err));
});

// get game by id

// add game
server.post('/games', (req, res) => {
	const { title, genre, releaseYear } = req.body;
	const game = { title, genre, releaseYear };

	if (!title || !genre) {
		res.status(422).json({ error: `must provide title and genre` });
	} else {
		db('games')
			.insert(game)
			.then(([id]) => {
				res.status(201).json({ message: `${game.title} added` });
			})
			.catch(err => {
				if (err.code === 'SQLITE_CONSTRAINT') {
					res.status(409).json({ error: `${game.title} already exists` });
				} else {
					res.status(500).json(err);
				}
			});
	}
});

// delete game by id

module.exports = server;
