const express = require('express');

const server = express();

const games = [];

server.use(express.json());



server.get('/', (req, res) => {
    res.status(200).json({ message: "server up" });
})


server.post('/games', (req, res) => {
    const input = req.body;

    if(!input.title || !input.genre)
        res.status(422).json({ message: "wrong input" });
    else {   
        games.push(input);
        res.status(200).json(input);
    }

})

server.get('/games', (req, res) => {
    
       res.status(200).json(games);

})

server.delete('/games', (req, res) => {
    
   games = [];

})


module.exports = server;