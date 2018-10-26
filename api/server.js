// require('dotenv').config();
const express = require('express');
const server = express();
server.use(express.json());

// CONFIG: server settings
const serverPort = process.env.PORT || 7100; // server port
const serverName = `Sprint-Challenge--Testing`; // Name of server to display at "/" endpoint 
const projectPullRequest = `https://github.com/michaelagard/Sprint-Challenge--Testing`;

// ENDPOINTS
server.get('/', (req, res) => { // sanity check root endpoint
  res.send(`${serverName} running on port ${serverPort}<br>More information: <a href="${projectPullRequest}">{serverName}</a>`);
});