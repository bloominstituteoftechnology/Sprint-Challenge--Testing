// initialize server and routes
const express = require('express');
const server = express();
// const REPLACE_ROUTE = require('./data/routers/REPLACE_ROUTE');

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
// server.use('/api/REPLACE_ROUTE', REPLACE_ROUTE);


server.listen(port, () => {
    console.log(`Server Started on port ${port}`); 
});