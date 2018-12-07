const express = require('express');

const server = express();

server.use(express.json());

//BASIC ROUTE....
server.get('/', (req, res) => {
    res.status(200).json({message : "SERVER UP"})
})

//POST ROUTE...
server.post('/games', (req, res) => {
     const {title, genre} = req.body;
     if(!title || !genre) {
          res.status(422).json({message : 'title and genre are required.'})
     } else {
          res.status(201).json({message : 'Successfully created.'})
     }
})

module.exports = server;