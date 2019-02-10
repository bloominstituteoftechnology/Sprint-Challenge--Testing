const express = require('express');
const games = require('./gamesModel.js')
const server = express()

server.use(express.json())

module.exports = server;

server.get('/games', async (req,res) => {
    const rows = await games.totalList();

    res.status(200).json(rows)
})