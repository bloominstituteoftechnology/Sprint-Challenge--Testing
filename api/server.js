const express = require('express');
const Games = require('../Games/gamesModel.js');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({API: 'UP'});
});