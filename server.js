const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

server.get('/', (req, res)=> {
    res.status(200).json({message: "Hi :)"});
});

server.post('/games', (req, res)=> {
    const title = req.body || 'Untitled Game';
    if(!title) {
        res.sendStatus(201).json({message: "This game is untitled for now"});
    }
    res.sendStatus(201).json({ game: `The new game is titled ${title}` });
});

server.get('/ourgames', (req, res)=> {
    const games = [];
    if(games === 0) {
        res.sendStatus(404).json({message: "There are no games available"});
    }
    res.sendStatus(200).json({games: "Racing Game"});
});

server.post('/game', (req, res)=> {

});

module.exports = server;