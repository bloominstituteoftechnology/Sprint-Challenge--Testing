const express = require("express");
const server = express();

server.use(express.json());

const port = process.env.PORT || 9000;

module.exports = server;
