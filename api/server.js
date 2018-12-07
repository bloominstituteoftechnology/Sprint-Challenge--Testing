const express = require('express');
const server = express();
server.use(express.json());

const checkTitleGenre = require('../middleware/checkTitleGenre.js')

server.get('/', (req, res) => {
  res.status(200).json({ api: 'Ready!' })
})

server.post('/games', checkTitleGenre, (req, res) => {
  const { title, genre, releaseYear } = req.body;
  res.status(200).json({ added: `${genre}: ${title} (${releaseYear})` })
})

server.get('/allGames', (req, res) => {
  res.status(200).json({ message: 'list of games' })
})

// const port = process.env.PORT || 7200;

module.exports = server;