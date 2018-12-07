const knex = require('knex');
const express = require('express');

const server = express();
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);
server.use(express.json());

const config = require('./knexfile.js').development;

// sanity check
server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

module.exports = server;