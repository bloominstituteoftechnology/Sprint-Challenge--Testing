const express = require('express');

const server = express();

const games = require('../arcade/arcade')

server.use(express.json());




module.exports = server;