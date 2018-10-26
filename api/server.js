const express = require('express');
const server = express();
server.use(express.json());
const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

server.get('/', (req, res) => {
  res.status(200).json({ message: "Server running" });
});

module.exports = server;