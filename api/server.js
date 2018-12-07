const express = require("express");

const server = express();

server.use(express.json());

const fakeDb = require("../data/fakeDb.js");

// Sanity check endpoint
server.get("/", (req, res) => {
    res.status(200).json({ api: "Up and connected" });
});

module.exports = server;