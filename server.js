// import dependencies
const express = require('express');

// declare the server
const server = express();

// apply middleware
server.use(express.json());

// establish GET endpoint
server.get('/games', (req, res) => {
  res
    .status(200).end();
})

// export server so tests can interact with it
module.exports = server;