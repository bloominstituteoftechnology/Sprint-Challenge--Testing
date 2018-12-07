const express = require('express');
const server = express();
server.use(express.json());
const games = require('../gamesArr')

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Running' });
});

server.get('/games', (req,res) => {
    const gameList = [...games];
    res.status(200).send(gameList)
})

server.post('/games', (req,res) => {
    if(req.body.title && req.body.genre){
        games.push(req.body)
        const gameList = [...games]
        res.status(200).send(gameList)
    }else{
        res.status(422).send("error")
    }
})

module.exports = server;