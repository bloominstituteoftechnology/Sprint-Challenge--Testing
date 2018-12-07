const express = require('express');
const server = express();
server.use(express.json());
const db = require('../data/dbConfig.js');

const checkTitleGenre = require('../middleware/checkTitleGenre.js')

server.get('/', (req, res) => {
  res.status(200).json({ api: 'Ready!' })
})

server.post('/games', checkTitleGenre, (req, res) => {
  const { title, genre, releaseYear } = req.body;
  db('games')
  .insert({ title, genre, releaseYear })
  .then(ids => {
    res.status(200).json({ added: `${genre}: ${title} (${releaseYear})` })
  })
  .catch(err => json(err));
})

server.get('/games', (req, res) => {
  db('games')
    .select('title', 'genre', 'releaseYear') 
    .then(games => {
    return res.status(201).json(games);
  })
  .catch(err => {
    res.status(500).json({ 
      message: "The games could not be retrieved.",
      error: err })
  })
})

// const port = process.env.PORT || 7200;

module.exports = server;