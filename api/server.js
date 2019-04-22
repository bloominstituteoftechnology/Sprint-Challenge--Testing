const express = require('express')

const server = express();

const videgamesDB = require('../data/helpers/gamesDb');

server.use(express.json());

server.get('/', async (req, res) => {
    const videogames = await videogamesDB.get();

    res.status(200).send(videogames);
})

module.exports = server;