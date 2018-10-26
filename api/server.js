const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(express.json());

const helperMethods = require('./helper-methods.js');

let games = [
    {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
      }
];

server.get('/games', (req,res)=>{
    res.status(200).json(games);
});

server.post('/games', (req,res)=>{
    const gameObject = req.body;
    // if (gameObject.)
    games.push(gameObject);
    res.status(201).json(games);
})

server.delete('/games', (req,res)=>{
    const {name} = req.params;
    // const lastName = req.body.lastName;
    res.status(201).json({deleted: `${name}`});
})

server.put('/hello', (req,res)=>{
    const {name} = req.params;
    const lastName = req.body.lastName;
    res.status(200).json({updated: `${name} ${lastName}`});
})

module.exports = server;