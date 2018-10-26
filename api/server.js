const express = require('express');

const server = express();

server.use(express.json());

let games = [

];

server.get('/', (req, res) => {
  res.json({message: 'Server check' });
});

server.get('/games', (req, res) => {
  res.status(200).json(games);
})

server.post('/games', (req, res) => {
  let { title, genre, releaseYear } = req.body;

  if (!title || !genre) {
    return res.status(422).json({ error: "Title and genre are required fields." })
  }

  return res.status(201).json({ message: `${title} added` })
})


module.exports = server;