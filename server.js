const express = require('express');
const helmet = require('helmet');

const { errorHandler } = require('./errorHandler/handlers');

const server = express();
server.use(helmet());
server.use(express.json());

let count = 0;
let state = [
	{
		id: 0,
		title: 'Pacman', // required
		genre: 'Arcade', // required
		releaseYear: 1980 // not required
	}
];

server.use((req, res, next) => {
	next(['h404', `The requested path '${req.path}' doesn't exist.`]);
});

server.use(errorHandler);

module.exports = server;
