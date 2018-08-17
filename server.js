const express = require('express');
const server = express();
const PORT = 3003;
server.use(express.json());

let games = [];

// base endpoint to ensure server is working
server.get('/', (req, res) => {
  res.status(200).json({ server: 'running' });
});

server.get('/games', (req, res) => {
  res.status(200).json({ games });
});

// not found - 404
server.use((req, res) => {
  res.status(404).send(`<h1>404: resource "${req.url}" not found</h1>`);
});

if (true) {
  module.exports = server;
} else {
  server.listen(
    PORT,
    console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`),
  );
}
