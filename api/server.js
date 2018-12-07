const express = require('express');
const server = express();
server.use(express.json());

let games = [
	//fake db
	{
		id: 1,
		title: 'Mario',
		genre: 'Traditional',
		releaseYear: 1992
	},
	{
		id: 2,
		title: 'Street fighter 2',
		genre: 'Fighting',
		releaseYear: 1868
	},
	{
		id: 3,
		title: 'Mortal Kombat',
		genre: 'Fighting',
		releaseYear: 1990
	}
];

function getAGame(id) {
	const game = games.find((game) => {
		game.id === id;
	});
	if (!game) {
		return null;
	} else {
		return game;
	}
}

//test server
server.get('/', (req, res) => {
	res.status(200).json({ api: 'Server is ready for platanos' });
});

server.get('/games/:id', (req, res) => {
	const id = req.params.id;
	const game = getAGame(parseInt(id));
	game ? res.status(200).json(req.body) : res.status(404).json({ error: 'no game matching that id found' });
});

// get all games list
server.get('/games', (req, res) => {
	res.status(200).json(games);
});

// make a game and add to fake db
server.post('/games', (req, res) => {
	const { id, title, genre, releaseYear } = req.body;
	if ((!id, !title && !genre && !releaseYear)) {
		res.status(422).json({ err: 'Needs all info' });
	} else {
		const createdGame = { id, title, genre, releaseYear };
		games = [ ...games, createdGame ];
		res.status(201).json({ message: `${createdGame}` });
	}
});

module.exports = server;
