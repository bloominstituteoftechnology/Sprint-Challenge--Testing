const express = require('express');
const server = express();

server.use(express.json());

let games = [];


server.get('/', (req, res) => {
	res.status(200).json({ api: 'running' });
});

server.get('/games', (req, res) => {
	res.status(200).json(games);
});

server.post('/games', (req, res) => {
	if(req.body.title && req.body.genre) {
		games.push(req.body);
		res.status(201).json({ message: "Game added."});
	} else {
		res.status(422).json({ message: 'Game title and game genre needed.' });
	}
});

module.exports = server;