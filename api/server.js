const express = require('express');
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'Ready!' })
})

server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (typeof req.body.releaseYear === 'undefined' ) {req.body.releaseYear = null}
  res.status(200).json({ added: `${genre}: ${title} (${releaseYear})` })
})

const port = process.env.PORT || 7200;

module.exports = server;