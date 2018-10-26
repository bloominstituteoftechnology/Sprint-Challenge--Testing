const express = require('express');
const request = require('supertest');


const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'server is running' });
});

// server.post('/api/notes', (req, res) => {
//   const note = req.body; //{ noteTitle: 'some title', noteBody: 'someBody' }
//   const title = req.body.noteTitle;

//   res.status(200).json({ newNote: title });
// });

module.exports = server;