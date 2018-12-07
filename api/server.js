const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.status(200).json({ api: 'Server is ready for platanos' });
});

server.post('/games', (req, res) => {
	const { title, genre, releaseYear } = req.body;
	res.status(200).json({ message: `${title} ${genre} ${releaseYear}` });
});

const port = process.env.Port || 9000;

module.exports = {
	server,
	port
};
