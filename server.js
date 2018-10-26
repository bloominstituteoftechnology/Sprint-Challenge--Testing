const express = require('express');

const server = express();
server.use(express.json());

const games = [];

module.exports = server;