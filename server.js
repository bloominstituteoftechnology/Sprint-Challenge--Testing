const express = require('express');
const server = express();
const games = require('./gameModel');

server.use(express.json());



module.exports = {
    server
}
