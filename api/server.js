const express = require('express');

const games = require('../games/gamesModel');

const server = express();

server.use(express.json());

server.get('/', async (req , res) => {
    res.status(200).json({ api: 'games database up '});
});


module.exports = server;