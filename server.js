const express = require('express');

const server = express();

const db = require('./dbmodel');

server.use(express.json());

server.get('/games', async (req, res) => {
  try {
    const response = await db.get();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.get('/games/:id', async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const response = await db.getById(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json({ message: 'Bad request' });
  }
});

server.post('/games', async (req, res) => {
  const body = req.body;
  if (body) {
    try {
      const response = await db.insert(body);
      res.status(201).json(response);
    } catch (err) {
      res.status(422).json(err);
    }
  } else {
    res.status(500).json({ message: 'Bad request' });
  }
});

server.put('/games/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  if (id && body) {
    try {
      const response = await db.update(id, body);
      res.status(201).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json({ message: 'Bad request' });
  }
});

server.delete('/games/:id', async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const response = await db.delete(id);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json({ message: 'Bad request' });
  }
});

module.exports = server;
