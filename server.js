const express = require("express");

const server = express();

server.use(express.json());

// ENDPOINTS

server.get("/", (req, res) => {
  res.status(200).json({ message: "Up and Running" });
});

module.exports = server;
