// require('dotenv').config();
const express = require('express');
const server = express();
server.use(express.json());

// CONFIG: server settings
const serverPort = process.env.PORT || 7100; // server port
const serverName = `Sprint-Challenge--Testing`; // Name of server to display at "/" endpoint 
const projectPullRequest = `https://github.com/michaelagard/Sprint-Challenge--Testing`;
let gameArray = [];
// ENDPOINTS
server.get('/', (req, res) => { // sanity check root endpoint
  res.send(`${serverName} running on port ${serverPort}<br>More information: <a href="${projectPullRequest}">{serverName}</a>`);
});
server.get('/api/games', (req, res) => { // sanity check root endpoint
  res.status(200).json(gameArray);
});
server.post('/api/games/', (req, res) => {
  let { title, genre, releaseYear } = req.body;
  if (title && genre) {
    gameArray.push(req.body)
    res.status(201).json(1);
  } else {
    res.status(422).json(JSON.stringify(req.params.title))
    console.log('THIS')
  }
});
module.exports = server;