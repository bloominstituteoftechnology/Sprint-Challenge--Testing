const express = require('express');
const server = express();
server.use(express.json());

// games dummy data

let games = [
  {
    "title": "Dota 2",
    "genre": "MOBA",
    "releaseYear": 2011,
    "id": 0
  },

  {
    "title": "Unreal Tournament",
    "genre": "First-Person Shooter",
    "releaseYear": 1999,
    "id": 1
  },

  {
    "title": "Deus Ex",
    "genre": "Action role-playing",
    "releaseYear": 2000,
    "id": 2
  },

  {
    "title": "World of Warcraft",
    "genre": "MMORPG",
    "releaseYear": 2000,
    "id": 3
  },

  {
    "title": "Blade and Soul",
    "genre": "MMORPG",
    "releaseYear": 2012,
    "id": 4
  }

]

let newID = games.length; // new ID should be the next number

// function to check for unique titles

function uniqueCheck(title) {
  for(i = 0; i < games.length; i++) {
    if(title === games[i].title) {
      return false;
    }
  }
  return true;
}

// simple GET request to test server

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Server running successfully!' });
});

// get games data

server.get('/games', (req, res) => {
  res.status(200).json(games);
})

// post a new game

server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if(!title || !genre || !releaseYear) {
    res.status(422).json({ error: 'Please provide data in the correct format. '});
    // testing to make sure data is formatted, an admittedly terrible and vague error message
  } else {
    const newGame = { title, genre, releaseYear, "id": newID };
    games = [...games, newGame];
    res.status(201).json({newGame});
  }
});

module.exports = server;

// // server.post('/games', (req, res) => {
//   const { title, genre, releaseYear } = req.body;
//   if(!title || !genre || !releaseYear) {
//     res.status(422).json({ error: 'Please provide data in the correct format. '});
//     // testing to make sure data is formatted, an admittedly terrible and vague error message
//   } else {
//     const newGame = { title, genre, releaseYear, "id": newID };
//
//     if(!uniqueCheck(newGame.title)) {
//       res.status(409).json({ error: 'Provided title already exists.' });
//     } else {
//       games = [...games, newGame];
//       res.status(201).json({newGame});
//     }
//   };
// });
