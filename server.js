const express = require('express');
const server = express();

server.use(express.json());

	const games = [{
		title: 'Pacman',
		genre: 'Arcade',
		releaseYear: 1980
	}];

server.get('/', (req, res) => {
  res.status(200).send('API is running');
});

server.get('/games', (req, res) => {
  res.status(200).json(games);
});


module.exports=server;



