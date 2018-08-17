const express = require('express');
const server = express();

const db = [
  {title: 'Pacman', genre: 'Arcade', releaseYear: 1980},
  {title: 'Monopoly', genre: 'Board', releaseYear: 1935},
  {title: 'Tetris', genre: 'Arcade', releaseYear: 1984}
];

server.use(express.json());
server.get('/', (req, res) => {res.status(200).json({api: 'API is running'})})
server.get('/games', (req, res) => {
  res.status(200).json(db);
})
server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body;
  const game = { title, genre, releaseYear }
  if (!title || ! genre) {
    res.status(422).json({ msg: 'Title and Genre are require to create a new game'})
  }
  for (let i=0; i<db.length; i++) {
    if(db[i].title.toLowerCase() === title.toLowerCase()) 
        return res.status(405).json({error: 'Game already exists'})
  }
  res.status(201).json(game)
})

module.exports = server;