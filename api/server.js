const express = require('express');
const server = express();
server.use(express.json());
const games = require('../gamesArr')

server.get('/', (req, res) => {
    res.status(200).json({ api: 'Running' });
});

server.get('/games', (req,res) => {
    // const gameList = [...games];
    if(games){
        res.status(200).send(games)
    }else{
        res.status(200).send(["games list empty"])
    }
})

server.post('/games', (req,res) => {
    const title = req.body.title;
    games.map(game =>{
        if(title === game.title){
            res.status(405).send("Game Already Exists")
        }
    })
    if(req.body.title && req.body.genre){
        games.push(req.body)
        const gameList = [...games]
        res.status(200).send(gameList)
    }else{
        res.status(422).send("error")
    }
});

module.exports = server;