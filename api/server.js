const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json('the line is hot');
});

// server.post('/:name', (req, res) => {
//     const { name } = req.params;

//     res.status(202).json( { heyo: `${name}`})
// });

server.post('/api/games', (req, res, next) => {
	if (req.body.title && req.body.genre && req.body.releaseYear) {
		const { title, genre, releaseYear } = req.body;
		id++;
		state[id] = { title, genre };
		res.status(201).json({ gameId: id });
	} else {
		next(['h400', 'Missing title, genre, or releaseYear.']);
	}
});

module.exports = server;

