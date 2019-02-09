const games = require("../games/gamesModel");
const db = require("../data/dbConfig.js");

afterEach(async () => {
    await db("games").truncate();
  });

describe("the games model", () => {
  it("should retrieve games", async () => {
    const rows = await games.fetch();
    expect(rows).toEqual([]);
  });
  it("should insert a game", async () => {
    const ids = await games.insert({title: 'Kingdom Hearts', genre: 'RPG', releaseYear: 2002});

       expect(ids.length).toBe(1);
       expect(ids[0]).toBe(1);
  })
})