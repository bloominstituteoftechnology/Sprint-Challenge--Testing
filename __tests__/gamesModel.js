const games = require("./gamesModel");
const db = require("../data/dbConfig.js");

afterEach(async () => {
    await db("games").truncate();
  });

describe("the games model", () => {
  
})