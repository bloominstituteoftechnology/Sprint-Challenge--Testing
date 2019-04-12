const express = require('express');
const server = express();

server.use(express.json());

const count = 3;
const users = [
    {
        title:'Defense Of The Ancients - DOTA',
        genre: 'Action Real Time Strategy',
        id: 1
    },
    {
        name:'Kingdom Hearts',
        genre: 'Action/RPG',
        id: 2
    },
    {
        name:'Ragnarok: Eternal Love',
        genre: 'Massive Multiplayer Online Role Playing Game',
        id: 3
    },
];


server.get('/', (req, res) => {
    res.send('<h1>Sanity Check!</h1>');
});

module.exports = server;