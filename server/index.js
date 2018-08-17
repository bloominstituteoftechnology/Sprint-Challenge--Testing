const express = require('express');
const helmet = require('helmet')

const server = express();

const data = [
  {
    "title": "Pokemon",
    "genre": "Adventure",
    "year": "1994"
  },
  {
    "title": "Yu-gi-oh",
    "genre": "Card",
    "year": "1994"
  }
]

server.use(express.json());
server.use(helmet())

server.get('/games', (req, res) => {
  res.status(200).json(data);
})

server.post('/games', (req, res) => {
  res.status(200).json(req.body)
})


module.exports = server;
