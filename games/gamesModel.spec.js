const Games = require("./gamesModel.js");
const db = require("../data/dbConfig.js");

describe("The Game Model", () => {
  beforeEach(() => {
    return db("games").truncate(); //cleanup
  });

  describe("The Insert Funct", () => {
    it("should put a game into the db", async () => {
      await Games.insert({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });

      const games = await db("games");

      expect(games.length).toBe(1);
      expect(games[0].title).toBe("Pacman");
    });
    it("should return the inserted game with id", async () => {
      const games = await Games.insert({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });

      expect(games.id).toBe(1);
    });
    it("should contain the correct data", async () => {
      const games = await Games.insert({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });

      const data = await db("games");

      expect(data[0]).toEqual({
        title: "Pacman",
        genre: "Arcade",
        id: 1,
        releaseYear: 1980
      });
    });
  });
  describe("the Get all funct", () => {
    it("should return list of games", async () => {
      await db("games").insert([
        {
          title: "Pacman",
          genre: "Arcade",
          releaseYear: 1980
        }
      ]);

      const games = await Games.getAll();

      expect(games.length).toBe(1);
      expect(games[0].title).toBe("Pacman");
    });
    it("should return an empty array if there are no games", async () => {
      const games = await Games.getAll();

      expect(games).toEqual([]);
    });
  });
});
