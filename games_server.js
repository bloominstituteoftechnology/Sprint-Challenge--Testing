const express = require('express');
const server = express();
const games = require('./Data/games_data');



server.get('/api/games', (req, res) => {
    res.status(200).json(games)
});

server.post('/api/games', (req, res) => {
 const game = req.body;
 games.insert(game).then( newGame => {
    if(game) {
        res.status(201).json({message: "Added game to library"})
    }
 })
 .catch(err => {message: "Error game not added to library"})
    
})


module.exports = server;



