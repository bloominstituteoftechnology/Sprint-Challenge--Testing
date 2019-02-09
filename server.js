const express = require("express");
const server = express();

server.use(express.json());

module.exports = server;

server.post("/games", (req, res) => {

});

server.get("/games", (req, res) => {
    
});