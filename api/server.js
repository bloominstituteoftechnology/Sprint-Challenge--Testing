const express = require('express');

const games = require('../games/gamesModel.js');
const db = require('../data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
	res.status(200).json({ api: 'up' });
});

server.get('/games', async (req, res) => {
	const rows = await games.getAll();

	res.status(200).json(rows);
});

server.post('/games', async (req, res) => {
	try {
		if (req.body.title && req.body.genre) {
			const newGame = await db.insert(req.body);
			res.status(200).json(newGame);
		} else {
			res.status(422).json({
				message: 'Please add title and genre'
			});
		}
	} catch (err) {
		res.status(500).json({
			message: 'unable to post'
		});
	}
});

module.exports = server;
