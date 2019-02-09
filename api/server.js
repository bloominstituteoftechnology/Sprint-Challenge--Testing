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

server.get("/games", async (req, res) => {
    const games = await db("games");

    try {
        res.status(200).json(games)
    } catch (err) {
        res.status(500).json({
            message: "Error getting list of games."
        })
    }
})

server.post("/games", async (req, res) => {
    const game = req.body;

    try {
        const inserted = await db("games").insert(game).into("games")
        res.status(201).json(inserted)
    } catch (err) {
        res.status(422).json({
            message: "Error adding new game."
        })
    }
})

module.exports = server;