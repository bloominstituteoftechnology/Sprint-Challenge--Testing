const express = require("express");
const configMiddleware = require("../config/middleware");
const server = express();
const db = require("../data/dbConfig");

configMiddleware(server);

server.get("/", async (req, res) => {
    res.status(200).json({
        message: "WORKING!"
    });
});

module.exports = server;