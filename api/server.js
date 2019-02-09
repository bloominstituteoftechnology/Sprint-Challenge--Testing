/* Framework and Library requires */
const express = require('express');

/* Local file requires */
const dbHelpers = require('../data/helpers');

const server = express();

server.use(express.json());

server.get('/games', async (req, res) => {

});

module.exports = server;