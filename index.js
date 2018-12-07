const express = require("express");
const port = process.env.PORT || 3334;

const server = express();
server.use(express.json());

let games = [
  { title: "Help Ryan Study", genre: "Platformer", year: 2018 },
  { title: "Mario Teaches Typing", genre: "Educational", year: 1991 }
];

server.get("/", (req, res) => {
  res.status(200).json({ api: "is up" });
});

server.listen(port, `we hear you ${port}`);

module.exports = server;
