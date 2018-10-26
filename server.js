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
let id = 2;

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.get('/games', (req, res) => {
  res.status(200).json([]);
});

server.post('/games', (req, res) => {
  let { title, genre, releaseYear } = req.body;

  if (!title || !genre || !releaseYear) {
    return res.status(422).json('All fields must be complete.');
  } else if (games.some(x => x.title === title)) {
    return res.status(405).json('Title must be unique');
  }
  return res.status(201).json({ id: ++id, title, genre, releaseYear });
});

server.get('/games/:id', (req, res) => {
  let id = Number(req.params.id);
  let game = games.find(x => x.id === id);
  if (!game) return res.status(404).json('Game does not exist');
  return res.status(200).json(game);
});

server.delete('/games/:id', (req, res) => {
  let id = Number(req.params.id);
  let game = games.find(x => x.id === id);
  if (!game) return res.status(404).json(0);

  return res.status(200).json(1);
});

module.exports = server;
