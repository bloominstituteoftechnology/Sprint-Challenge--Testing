const server = require("./server");
const request = require("supertest");

const games = [
  { id: "1", title: "Pacman", genre: "Arcade", releaseYear: 1980 },
  { id: "2", title: "Fortnite", genre: "Battle Royale", releaseYear: 2017 },
  { id: "3", title: "Assassins Creed", genre: "Action", releaseYear: 2017 },
  { id: "4", title: "Mario Cart", genre: "Kids Wii Gaming", releaseYear: 2000 }
];

describe("Server", () => {
  
    describe("GET request to /games", () => {
    it("should return a status code of 200", async () => {
      const response = await request(server).get("/games");
      expect(response.status).toEqual(200);
    });
    it("should return a list of games", async () => {
      const response = await request(server).get("/games");
      expect(response.body).toEqual(games);
    });
    it("should return an array", async () => {
      const response = await request(server).get("/games");
      expect(Array.isArray(games)).toBeTruthy();
    });
  });
  
});
