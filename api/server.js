const express = require('express');

const server = express();

server.use(express.json())

// const db = require('../data/helpers/models.js')

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.post('/games', (req, res) => {
  const { title, genre } = req.body
  const releaseYear = req.body.releaseYear || null
  const game = { title, genre }
  console.log(game);

  if (title && genre) {
    if(typeof title != 'string' && typeof genre != 'string') {
      res.status(415).json({ message: 'unsupported data type' })
    } else {
      res.status(200).json(game)
    }
  } else {
    res.status(422).json(game)
  }
  // db.insert(game)
  //   .then( response => {
  //     res.status(200).json(game)
  //   })
  //   .catch(err => {
  //     res.status(500).json(err.message)
  //   })
})

server.get('/games', (req, res) => {
  res.status(200).json([])
})


module.exports = server;
