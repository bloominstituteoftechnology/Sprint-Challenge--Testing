const express = require('express');
const server = express();
server.use(express.json());

// games dummy data

const games = [
  {
    "title": "Dota 2",
    "genre": "MOBA",
    "releaseYear": 2011
  },

  {
    "title": "Unreal Tournament",
    "genre": "First-Person Shooter",
    "releaseYear": 1999
  },

  {
    "title": "Deus Ex",
    "genre": "Action role-playing",
    "releaseYear": 2000
  },

  {
    "title": "World of Warcraft",
    "genre": "MMORPG",
    "releaseYear": 2000
  },

  {
    "title": "Blade and Soul",
    "genre": "MMORPG",
    "releaseYear": 2012
  }

]
// simple GET request to test server

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Server running successfully!' });
});

// get games data

server.get('/games', (req, res) => {
  res.status(200).json(games);
})
module.exports = server;
