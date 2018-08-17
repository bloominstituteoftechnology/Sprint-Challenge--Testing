const express = require('express');

const server = express();

server.use(express.json())


let games = [
    {
    title: 'Pacman', // required
    genre: 'Arcade', // required
    releaseYear: 1980 // not required
  }
];

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
  });

  server.get('/games', (req, res) => {
    res.status(200).json({ games: games });
  });

  server.post('/games', (req, res) => {
    const {title, genre, releaseYear} = req.body;
    if (!title || title === '') {
        res.status(422).json({ error: 'Missing title' });
    }
    else if (!genre || genre === '') {
        res.status(422).json({ error: 'Missing genre' });
    }
    else{
    res.status(201).json({title: title, genre: genre, releaseYear});
    }

  })

  module.exports = server;