const express = require('express');
const server = express();
server.use(express.json());

let db = [
  {
    name: 'Game 1',
    breed: 'Action',
    releaseYear: '1991'
  },
  {
    name: 'Game 2',
    breed: 'Sci-Fi',
    releaseYear: '1992'
  },
  {
    name: 'Game 3',
    breed: 'Adventure',
    releaseYear: '1993'
  }
];

let emptyDb = [];

server.route('/')
  .get((req, res) => res.status(200).json({ message: 'En vivo!' }))

server.route('/games')
  .get((req, res) => {
    // if (emptyDb.length < 1) return res.status(404).json(emptyDb);
    return res.status(200).json(db)
  })

server.route('/games')
  .post((req, res) => {
    const { title, genre, releaseYear } = req.body;
    if (!title || !genre) return res.status(422).json({ error: 'title and genre required.' })
    if (typeof title !== 'string' || typeof genre !== 'string') return res.status(500).json({ error: 'title and genre needs to be strings.' })
    return res.status(201).json({ success: 'successfully created' });
  })

module.exports = server;
