const express = require("express");

const server = express();

server.use(express.json());

// ENDPOINTS

server.get("/", (req, res) => {
  res.status(200).json({ message: "Up and Running" });
});

// PORT

const port = process.env.PORT || 9000;

module.exports = server;
