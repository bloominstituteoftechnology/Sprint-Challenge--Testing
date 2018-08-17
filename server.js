const express = require('express');
const server = express();

 server.use(express.json());


 server.get('/games', (req, res) => {
    res.status(200).json({games: 'array of games'});
});

 server.post('/games', (req, res) => {
    const {id, title, genre} = req.body;
    res.status(201).json({id:id, title: title, genre: genre});
});

 server.delete('/games/:id', (req, res) => {
    const {id} = req.params;
    res.status(200).json({deleted: id})
});

 server.put('/games/:id', (req, res) => {
    const {id, title, genre} = req.body;
    res.status(200).json({id:id, title: title, genre: genre})
});

 module.exports = server;