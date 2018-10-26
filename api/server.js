const express = require("express");

const server = express();

server.use(express.json());

//sanity check
server.get("/", (req, res) => {
  res.send("server is up");
});
