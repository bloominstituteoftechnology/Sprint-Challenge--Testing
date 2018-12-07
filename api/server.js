const express = require('express');

const server = express();


server.use(express.json());

//Up and running endpoint
server.get('/', (req, res) => {
  res.status(200).json({ api: 'live' });
});


module.exports = server;