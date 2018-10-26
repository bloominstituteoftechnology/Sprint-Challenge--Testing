const express = require('express');
const server = express();
server.use(express.json());

let db = [
  {
    id: 1,
    name: 'Game 1',
    breed: 'Action',
    releaseYear: '1991'
  },
  {
    id: 2,
    name: 'Game 2',
    breed: 'Sci-Fi',
    releaseYear: '1992'
  },
  {
    id: 3,
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
    const id = incrementId();
    if (!title || !genre) return res.status(422).json({ error: 'title and genre required.' })
    if (typeof title !== 'string' || typeof genre !== 'string') return res.status(500).json({ error: 'title and genre needs to be strings.' })
    if (db.find(game => game.name === title)) return res.status(405).json({ error: 'duplicate game found' })
    return res.status(201).json({ success: 'successfully created' });
  })

server.route('/games/:id')
  .get((req, res) => {
    const { id } = req.params;
    const targetGame = db.filter(game => game.id === Number(id))
    if (targetGame.length > 0) return res.status(200).json(targetGame);
    return res.status(404).json({ message: 'no game with that id.' });
  })
  .delete((req, res) => {
    const { id } = req.params;
    const filtered = db.filter(game => game.id !== Number(id))
    if (filtered.length > 0) return res.status(202).json(filtered);
    return res.status(404).json({ message: 'could not delete game with that id.' });
  })

const incrementId = () => {
  return db.length + 1;
}

module.exports = server;
