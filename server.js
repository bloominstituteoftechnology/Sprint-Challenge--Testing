const express = require("express");

const server = express();

server.use(express.json());
server.use("/games", require("./games"));

module.exports = server;
