const express = require('express');
const server = express();

server.use(express.json());


server.get('/', (req, res) => {
  res.status(200).send('API is running');
});


module.exports=server;
