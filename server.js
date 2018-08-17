const express = require('express');
const db = require('knex')(require('./knexfile').development);

server = express();
server.use(express.json());
class HttpError extends Error {
  constructor(message, code = 100) {
    super(message);
    this.code = code;
  }
}

server.get('/games', (req, res) => {
  db('games')
    .select('games.title', { genre: 'genres.name' }, 'games.releaseYear')
    .innerJoin('genres', 'games.genreId', 'genres.id')
    .then(games => res.status(200).json(games))
    .catch((err) => {
      throw new HttpError(`Database error: ${err.response}`, 500);
    });
});

server.post('/games', (req, res, next) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || title.length === 0) {
    throw new HttpError('Post must include title and be at least 1 character', 422);
  } else if (!genre) {
    throw new HttpError('Post must include genre', 422);
  }
  db('genres')
    .select('id')
    .where('name', '=', genre)
    .then(([item]) => {
      if (item) {
        return [item.id];
      }
      return db('genres').insert({ name: genre });
    })
    .then(([id]) => db('games').insert({ title, genreId: id, releaseYear }))
    .then(confirm => res.status(201).end())
    .catch((err) => {
      if (err.errno === 19) {
        return next(new HttpError('Title already exists in database', 422));
      }
      throw new HttpError(
        `Game could not be created in database. Database message: ${err.response}`,
        500,
      );
    });
});

server.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.code).json({ message: err.message });
  }
  return res.status(404).json({ message: 'Path not found' });
});
module.exports = server;
