const express = require('express');

const db = [];

const server = express();

server.use(express.json());

server.get('/games', async (req, res) => {
    await
    res
        .status(200)
        .json(db);
});

module.exports = server;