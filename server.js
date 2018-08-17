const express = require('express');

server = express();
server.use(express.json());

let store = [];
class HttpError extends Error {
  constructor(message, code = 100) {
    super(message);
    this.code = code;
  }
}

server.get('/games', (res, req) => {
  return req.status(200).json(store);
});

server.post('/games', (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || title.length === 0) {
    throw new HttpError('Post must include title and be at least 1 character', 422);
  } else if (!genre) {
    throw new HttpError('Post must include genre', 422);
  }
  store.push({ title, genre, releaseYear });
  return res.status(201).end();
});

server.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.code).json({ message: err.message });
  } else {
    res.status(404).json({ message: 'Path not found' });
  }
  next(err);
});
module.exports = server;