const express = require('express')

const server = express();

const videogamesDB = require('../data/helpers/gamesDb');

server.use(express.json());

server.get('/', async (req, res) => {
    try {
        const videogames = await videogamesDB.get();
        res.status(200).send(videogames);
    } catch(err) {
        res.status(500).send(err);
    }   
});

server.post('/videogame', async(req, res) => {
    const videogame = req.body;

    if(videogame.title && videogame.genre) {
        try {
            const posted = await videogamesDB.add(videogame);
            res.status(201).json(posted);
        } catch(err) {
            res.status(500).send(err);
        }
    } else {
        res.status(401).json({message: 'New videogame needs a title and a body'});
    }
});

module.exports = server;