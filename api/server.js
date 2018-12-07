const express = require('express');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'Ready!' })
})

server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body;

  res.status(200).json({ add: `${genre}: ${title}` })
})

const port = process.env.PORT || 7200;

module.exports = server;