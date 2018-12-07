const express = require('express');

const gamesRouter = require('../routers/gamesRouter.js');

module.exports = server => {
    server.use(express.json());

    server.use('/api/games', gamesRouter);
};