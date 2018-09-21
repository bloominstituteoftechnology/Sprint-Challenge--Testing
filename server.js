const express = require('express');

const server = express();

const games = require('./data.js')

server.use(express.json());


server.get('/', (req,res)=> {
res.status(200).json({api: 'running'});
});

server.get('/games', (req,res) => {
    res.status(200).json({games});
    });

module.exports = server;