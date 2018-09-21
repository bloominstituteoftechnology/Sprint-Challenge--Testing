const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const server = new express();

server.use(helmet())
server.use(morgan('dev'))
server.use(express.json())

server.get("/", (req, res) => res.status(200).json({ status: true }));
server.use('/api/games', require('./routes/games'))

module.exports = server