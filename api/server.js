const express = require('express');
const server = express();

server.use(express.json());

let games = [
  {
    title: 'Pac-man',
    genre: 'Arcade',
    releaseYear: 1980
  },
  {
    title: 'Final Fantasy 3',
    genre: 'JRPG',
    releaseYear: 1994
  },
  {
    title: 'Sonic the Hedgehog',
    genre: 'Platform',
    releaseYear: 1991
  },
  {
    title: 'Overwatch',
    genre: 'FPS',
    releaseYear: 2016
  },
  {
    title: 'Portal',
    genre: 'Puzzle/Survival',
    releaseYear: 2007
  },
  {
    title: 'Tetris',
    genre: 'Puzzle',
    releaseYear: 1984
  },
  {
    title: 'Mortal Kombat',
    genre: 'Fighting',
    releaseYear: 1992
  },
  {
    title: 'Resident Evil',
    genre: 'Horror Survival',
    releaseYear: 1996
  },
  {
    title: 'Tomb-Raider',
    genre: 'Action-Adventure',
    releaseYear: 1996
  }
];

//sanity check
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

// GET games endpoint
server.get('/games', (req, res) => {
  if (!games.length) {
    res.status(200).json({ games: [] });
  } else {
    res.status(200).json({ games: games });
  }
});

// POST game endpoint
server.post('/games', (req, res) => {
  const { title, genre } = req.body;

  if (!title || !genre) {
    res.status(422).json({ message: 'Title and genre are required' });
  } else {
    games.push({ title, genre });
    res.status(201);
  }
});

module.exports = server;
