const express = require('express');
const server = express();

server.use(express.json());

let games = [
    { name: 'MHW' , genre: 'JRPG' },
    { name: 'AC Odyssey', genre: 'RPG' },
    { name: 'Marvel\'s Spiderman' , genre: 'RPG' },
]