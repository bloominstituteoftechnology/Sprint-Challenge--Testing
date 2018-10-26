const express = require('express');

const server = express();

server.use(express.json());

let gamesList = [
  {
    title: 'Spider-Man',
    genre: 'action-adventure',
    releaseYear: 2018,
  },
  {
    title: 'Fallout 4',
    genre: 'action, role-playing',
    releaseYear: 2017,
  },
  {
    title: "PLAYERUNKOWN'S Battlegrounds",
    genre: 'Action',
    releaseYear: 2017,
  },
  {
    title: 'Minecraft',
    genre: 'sandBox, survival Game',
    releaseYear: 2009,
  },
  {
    title: 'Grand Theft Auto V',
    genre: 'action-adventure',
    releaseYear: 2013,
  },
  {
    title: 'Portal',
    genre: 'platform, puzzle',
    releaseYear: 2007,
  },
];

server.get('/games', (req, res) => {
  if (!gamesList.length) {
    res.status(200).json({ games: [] });
  } else {
    res.status(200).json({ games: gamesList });
  }
});

server.post('/games', (req, res) => {
  const { title, genre } = req.body;

  if (!title || !genre) {
    res.status(422).json({ message: 'Name and genre required' });
  } else {
    gamesList = [...gamesList, req.body];

    res.status(201).send(gamesList);
  }
});

module.exports = server;
