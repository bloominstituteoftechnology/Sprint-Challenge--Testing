const express = require('express');
const knex = require('knex');

const games = require('../games.js');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'api: up' });
})

module.exports = server;