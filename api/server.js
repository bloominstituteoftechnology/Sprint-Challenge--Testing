const express = require('express');

const server = express();


server.use(express.json());

//Up and running endpoint
server.get('/', (req, res) => {
  res.status(200).json({ api: 'live' });
});

//POST
server.post('/games', (req,res) => {
  const { title, genre } = req.body;
  if (title && genre) {
    res.status(201).json(req.body)
  } else {
    res.status(422).json({ message: "Must provide a title and genre"})
  }
})

//GET
server.get('/games', (req,res) => {
 (req.body).length ? res.status(200).json([req.body]) : res.status(200).json([]);
})

module.exports = server;