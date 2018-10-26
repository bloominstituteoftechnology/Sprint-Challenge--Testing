const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(express.json());

let gamesDb = [
  {
    "title": "Pacman",
    "genre": "Arcade",
    "releaseYear": 1980
  },
  {
    "title": "Centipede",
    "genre": "Arcade",
    "releaseYear": 1980
  },
  {
    "title": "Galaga",
    "genre": "Arcade",
    "releaseYear": 1981
  },
  {
    "title": "Ateriods",
    "genre": "Arcade",
    "releaseYear": 1979
  }
]

// Add home route
server.get('/', (req, res) => {
  res.status(200).json({ message: 'Lets go!' });
});

server.get('/games', (req, res) => {
  const games = [
    {
      "title": "Pacman",
      "genre": "Arcade",
      "releaseYear": 1980
    },
    {
      "title": "Centipede",
      "genre": "Arcade",
      "releaseYear": 1980
    },
    {
      "title": "Galaga",
      "genre": "Arcade",
      "releaseYear": 1981
    },
    {
      "title": "Ateriods",
      "genre": "Arcade",
      "releaseYear": 1979
    },
    {
      "title": "Tekken World Cup",
      "genre": "Arcade",
      "releaseYear": 1985
    }
  ]
      res.status(200).json(games);
   
});

server.post('/games', (req, res) => {
  const { game } = req.body;

  if (!game) {
      return res.status(400).send({ error: "Please provide valid game data." });
  } else {
    gamesDb.push(game);
    return res.status(201).json(gamesDb)
  }

})

module.exports = server;