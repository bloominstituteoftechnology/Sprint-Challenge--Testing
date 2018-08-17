const express = require('express');

const server = express();
server.use(express.json());

const games = []

server.get('/', (req, res) => {
    res.status(200).send('api running');
})


module.exports = server;