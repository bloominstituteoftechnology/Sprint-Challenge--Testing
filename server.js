const express = require("express");
const server = express();

server.use(express.json());

// endpoints
// root path
server.get("/", (_, res) => {
  res.status(200).json({ api: "running..." });
});

module.exports = server;
