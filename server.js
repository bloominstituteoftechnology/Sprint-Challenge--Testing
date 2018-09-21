
const express = require('express');

const server = express();

const games = [
    {title: 'Pacman', genre: 'Arcade', releaseYear: 1980},
    {title: 'Nier Automata', genre: 'Action', releaseYear: 2017},
    {title: 'Child of Light', genre: 'Platform', releaseYear: 2014}
];

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.get('/games', (req, res) => {
    return res.status(200).json(games);
  });

    
  server.post('/games', (req, res) => {
    if( !req.body.title || !req.body.genre) {
        return res.status(422).json({message:'Incomplete data received'});
    }
    return res.status(201).json({});
  });

module.exports = server;