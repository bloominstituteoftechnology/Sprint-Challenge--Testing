const express = require('express');

const server = express();

server.use(express.json());

//BASIC ROUTE
server.get('/', (req, res) => {
    res.status(200).json({message : "SERVER UP"})
})

module.exports = server;