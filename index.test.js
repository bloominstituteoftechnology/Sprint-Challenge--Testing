const request = require("supertest");
const server = require("./server");

describe("server.js", () => {
  test("should run the root path with status 200", async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
  });

  describe("GET /games", () => {
    test("should return status code 200", async () => {
      const response = await request(server).get("/games");
      expect(response.status).toBe(200);
    });

    test("response data should be json type", async () => {
      const response = await request(server).get("/games");
      expect(response.type).toBe("application/json");
    });

    test("response data should always return an array", async () => {
      const response = await request(server).get("/games");
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("POST /games", () => {
    test("should return status code 201", async () => {
      const response = await request(server).post("/games");
      expect(response.status).toBe(201);
    });

    test("response data should return {message: 'game created'}", async () => {
      const game = {
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      };

      const response = await request(server)
        .post("/games")
        .send(game);
      expect(response.body).toEqual({ message: "game created" });
    });

    test("should return status code 422 if required fields were not provided", async () => {
      const response = await request(server)
        .post("/games")
        .send({ title: null, genre: "Arcade" });
      expect(response.status).toBe(422);
    });
  });
});
