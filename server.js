const express = require('express');

const server = express();

server.use(express.json());


server.get('/games', (req, res) => {
    const games = [];

    res.status(200).json({games});

})

server.post('/games', (req, res)=> {
    const { title, genre, releaseYear } = req.body;

    if(!title || !genre || !releaseYear){
        res.status(422).json({msg: 'Incorrect information'});
    }

    res.status(201).json({msg: "Post successful"});
})

module.exports = server;