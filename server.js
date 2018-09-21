const express = require('express');
const server = express();
server.use(express.json());

let games = [
  {
    id: 1,
    title: 'Pacman', // required
    genre: 'Arcade', // required
    releaseYear: 1980, // not required
  },
  {
    id: 2,
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

server.get('/games/:id', (req, res) => {
  let id = Number(req.params.id);
  let game = games.find(x => x.id === id);
  if (!game) return res.status(404).json('Game does not exist');
  return res.status(200).json(game);
});

// server.delete('/friends/:id', (req, res) => {
//   let id = req.params.id;

//   if (id < 5) return res.status(200).json(1);

//   return res.status(400).json(0);
// });

module.exports = server;
