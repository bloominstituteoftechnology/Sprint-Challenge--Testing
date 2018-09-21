const express = require('express');
const server = express();
server.use(express.json());

let games = [
  {
    title: 'Pacman', // required
    genre: 'Arcade', // required
    releaseYear: 1980, // not required
  },
  {
    title: 'Pacman2', // required
    genre: 'Arcade', // required
    releaseYear: 1981, // not required
  },
];

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.get('/games', (req, res) => {
  res.status(200).json([]);
});

server.post('/games', (req, res) => {
  let { title, genre, releaseYear } = req.body;

  if (!title || !genre || !releaseYear)
    return res.status(422).json('All fields must be complete.');

  return res.status(201).json({ id: 1, title, genre, releaseYear });
});

// server.delete('/friends/:id', (req, res) => {
//   let id = req.params.id;

//   if (id < 5) return res.status(200).json(1);

//   return res.status(400).json(0);
// });

module.exports = server;
