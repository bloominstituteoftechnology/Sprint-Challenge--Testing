const request = require("supertest");

const server = require("./api/server.js");

describe("server", () => {
  describe("GET /GAMES", () => {
    it("should return status code 200(ok)", async () => {
      const response = await request(server).get("/games");

      expect(response.status).toBe(200);
    });

    it("should return JSON", async () => {
      const response = await request(server).get("/games");
      expect(response.type).toBe("application/json");
    });

    it("should return empty array", async () => {
      const response = await request(server).get("/games");
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("POST /games", () => {
    it("should take a game", async () => {
      const testGame = {
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      };

      const response = await request(server)
        .post(`/games`)
        .send(testGame);

      expect(response.body).toEqual([testGame]);
    });

    it("should return status code 200(ok)", async () => {
      const testGame = {
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      };

      const response = await request(server)
        .post(`/games`)
        .send(testGame);

      expect(response.status).toBe(200);
    });
    it("should return status code 422(incomplete)", async () => {
      const testGame = {
        title: "Pacman",
        releaseYear: 1980
      };

      const response = await request(server)
        .post(`/games`)
        .send(testGame);

      expect(response.status).toBe(422);
    });
  });
});
