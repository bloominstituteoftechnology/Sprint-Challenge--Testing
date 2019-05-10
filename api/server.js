// initialize server and routes
const express = require('express');
const server = express();
const games = require('./data/routers/games');

// server variables and middleware
const port = 5511; 
const parser = express.json();

const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');

server.use(
    parser,
    logger('tiny'),
    helmet(), 
    cors(),
    );

// define routes and activate server
server.use('/api/games', games);


server.listen(port, () => {
    console.log(`Server Started on port ${port}`); 
});