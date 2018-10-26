const express = require('express');
const helmet = require('helmet');

const { errorHandler } = require('./errorHandler/handlers');

const server = express();
server.use(helmet());
server.use(express.json());

server.use((req, res, next) => {
	next(['h404', `The requested path '${req.path}' doesn't exist.`]);
});

server.use(errorHandler);

module.exports = server;
