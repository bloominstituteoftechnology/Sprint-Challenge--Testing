const express = require('express');
const server = express();

server.use(express.json());



server.post('/games', (req, res) =>{
    if (req.body.title && req.body.genre){
        res.status(200).json(req.body)
    } res.status(422).json({message: "Need input and title"})
    
})

server.get('/games', (req, res) =>{
    res.status(200).json({})
})





module.exports = server;