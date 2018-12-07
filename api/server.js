const express = require('express');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'Ready!' })
})

const port = process.env.PORT || 7200;

module.exports = server;