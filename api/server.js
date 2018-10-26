const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.json({message: 'Server check' });
});

server.get('/games', (req, res) => {
  
})

server.post('/games', (req, res) => {

})


module.exports = server;