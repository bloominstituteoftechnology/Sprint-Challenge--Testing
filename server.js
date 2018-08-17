const express = require('express');
const server = express();

server.use(express.json());

const games = [{
    title: 'Pacman',
    genre: 'Arcade',
    releaseYear: 1980
}]



module.exports = server;