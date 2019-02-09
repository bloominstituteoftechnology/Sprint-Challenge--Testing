const express = require('express');

const server = express();

const games = require('../arcade/arcade')

server.use(express.json());


//Server response get '/'
server.get('/', async (req, res) => {
    res.status(200).json({ response: 'we are ready'})
})

server.get('/games', async (req, res) => {
    const list = await games.getAll();
    res.status(200).json(list);
})



module.exports = server;