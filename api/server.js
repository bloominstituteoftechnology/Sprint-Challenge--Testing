// initialize server and routes
const express = require('express');
const server = express();
const games = require('./routers/games');

// server variables and middleware
const port = 5511; 
const parser = express.json();

const helmet = require('helmet');
const logger = require('morgan');

server.use(
    parser,
    logger('tiny'),
    helmet(), 
    );

// define routes and activate server
server.get('/', (req, res) => {
    res.status(200).json({message: 'Hello World'})
});

server.use('/api/games', games); // route

module.exports = server;