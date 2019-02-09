const request = require("supertest");
const server = require("./server");

describe("route handlers", () => {
  describe("POST /games", () => {
    it("recieves a 201 status", async () => {
      const game = { title: "PacMan", genre: "Arcade", releaseYear: 1980 };
      const response = await request(server)
        .post("/games")
        .send(game);

      expect(response.status).toBe(201);
    });

    it("recieves a 422 status for incomplete game data", async () => {
      const game = { title: "PacMan", genre: "", releaseYear: 1980 };
      const response = await request(server)
        .post("/games")
        .send(game);

      expect(response.status).toBe(422);
    });

    it("response is in json format", async () => {
      const game = { title: "PacMan", genre: "Arcade", releaseYear: 1980 };
      const response = await request(server)
        .post("/games")
        .send(game);

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
