const express = require('express');
const server = express();

server.use(express.json());

server.get('/games', (req, res) => {

})

server.post('/games', (req, res) => {
    
})

server.get('/games/:id', (req, res) => {
    
})

server.delete('/games/:id', (req, res) => {
    
})

module.exports = server;