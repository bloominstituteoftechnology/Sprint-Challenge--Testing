const express = require('express');
const configMiddleware = require('../config/middleware');
const server = express();
const db = require('../data/dbConfig');

configMiddleware(server);

module.exports = server;
