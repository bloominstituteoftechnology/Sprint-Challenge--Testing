const server = require("../index");
const request = require("supertest");

describe("Index Route", () => {
  it("should check if the server is running", async () => {
    const res = await request(server).get("/");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
  });
});

describe("Games Route", () => {
  describe("GET /api/games", () => {
    it("should check for respose", async () => {
      const res = await request(server).get("/api/games");
      expect(res.status).toBe(200);
    });

    it("should check for games in response", async () => {
      const res = await request(server).get("/api/games");
      expect(res.body.status).toBe(true);
      expect(typeof res.body.games).toBe("object");
    });
  });

  describe("POST /api/games", () => {
    it("should check for resposne", async () => {
      const res = await request(server)
        .post("/api/games")
        .send({
          title: "Pong",
          genre: "Arcade",
          releaseYear: 1972
        });

      expect(res.status).toBe(200);
    });

    it("should check if the game is added", async () => {
      const { body } = await request(server).get("/api/games");
      const res = await request(server)
        .post("/api/games")
        .send({
          title: "Pong",
          genre: "Arcade",
          releaseYear: 1972
        });

      expect(res.status).toBe(404);
    });
  });

  describe("GET /api/games/:id", () => {
    it("should check for response", async () => {
      const res = await request(server).get("/api/games/1");
      expect(res.status).toBe(200);
    });

    it("should return 404 for not existing game", async () => {
      const res = await request(server).get("/api/games/10000");
      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /api/games/:id", () => {
    it("should check for response", async () => {
      const res = await request(server).delete("/api/games/1");
      expect(res.status).toBe(200);
    });

    it("should return 404 for not existing game", async () => {
      const res = await request(server).delete("/api/games/10000");
      expect(res.status).toBe(404);
    });
  });
});
