const express = require('express');
const server = express();

server.use(express.json());

server.route('/')
  .get((req, res) => res.status(200).json({ message: 'En vivo!' }))

server.route('/games')
  .post((req, res) => {
    const { title, genre, releaseYear } = req.body;
    if (!title || !genre) return res.status(422).json({ error: 'title and genre required.' })
    if (typeof title !== 'string' || typeof genre !== 'string') return res.status(500).json({ error: 'title and genre needs to be strings.' })
    return res.status(201).json({ success: 'successfully created' });
  })

module.exports = server;
