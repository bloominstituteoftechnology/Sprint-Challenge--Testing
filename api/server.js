const express = require('express');

const games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});

//Get Games
server.get('/games', async (req, res) => {
  const rows = await games.getAll();

  res.status(200).json(rows);
});

//Add a Game

server.post('/games', (req, res) => {
    const { title, genre, releaseYear} = req.body
    if(!title || !genre || !releaseYear){
        return res.status(422).json({errorMessage: "Add Title or Genre or Release Year"})
    }
    games.insert({ title, genre, releaseYear}).then(game => {
            res.status(201).json({game})
    }).catch( error => {
        res.status(422).json(error)
    })
});


module.exports = server;
