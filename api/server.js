//create express server
const express = require('express');
const server = express();

//add builtin middleware
server.use(express.json());

//test server
server.get('/', (req, res)=>{
  res.json({Server:'Up and running!'});
})



module.exports = server;

