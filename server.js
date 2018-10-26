const express = require("express");

const server = express();

server.use(express.json());

let gamesArray = [
  
    { title: "madden", genre: "console", year: "every", id: 1 },
    { title: "halo", genre: "console", year: "2000?", id: 2 }

];

server.get("/", (req, res) => {
  res.send("Its alive! ITS ALIVE!");
});

server.post("/games", (req, res) => {
const { title, genre, year } = req.body; 
const titles = [];

const addTitles = () => {
for(let i =0; i<gamesArray.length; i++){
    titles.push(gamesArray[i].title);
  }
}

addTitles();

console.log(titles);
if (titles.includes(title)) {
    res.status(405).send("Game is already in database");
  } else if (title && genre) {
    res.status(201).send(`${title} added to game database`);
  } else {
    res.status(422).send("Required game fields missing");
  }
});

server.get("/games", (req, res) => {
  res.status(200).send(gamesArray);
});

module.exports = server;
