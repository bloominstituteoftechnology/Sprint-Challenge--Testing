const request = require("supertest");
const server = require("./server");
const DB = require("../data/dbConfig");

describe("route handlers", () => {
  describe("POST /games", () => {
    afterEach(async () => {
      await DB("games").truncate();
    });
    it("recieves a 201 status", async () => {
      const game = { title: "PacMan", genre: "Arcade", releaseYear: 1980 };
      const body = { game };
      const response = await request(server)
        .post("/games")
        .send(body);

      expect(response.status).toBe(201);
    });

    it("recieves a 422 status for incomplete game data", async () => {
      const game = { title: "Aliens", genre: "", releaseYear: 0 };
      const body = { game };
      const response = await request(server)
        .post("/games")
        .send(body);

      expect(response.status).toBe(422);
    });

    it("response is in json format", async () => {
      const game = { title: "PacMan", genre: "Arcade", releaseYear: 1980 };
      const body = { game };
      const response = await request(server)
        .post("/games")
        .send(body);

      expect(response.type).toMatch(/json/i);
    });
  });
  describe("GET /games", () => {
    it("returns a status code of 200", async () => {
      const response = await request(server).get("/games");

      expect(response.status).toBe(200);
    });

    it("should return an games array", async () => {
      const response = await request(server).get("/games");

      expect(response.body).toContain("games");
    });

    it("returns an array even if no games", async () => {
      const response = await request(server).get("/games");
      const games = response.body.games;
      expect(response.body).toContain("games");
      expect(games.length).toBeFalsy();
    });
  });
});
