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
    const game = {
      title: "Luigi's Mansion",
      genre: "Action-adventure",
      releaseYear: 2001
    };

    const gameNull = {
      title: "Mortal Kombat",
      genre: null
    };

    test("should return status code 201", async () => {
      const response = await request(server)
        .post("/games")
        .send(game);
      expect(response.status).toBe(201);
    });

    test("response data should return {message: 'game created'}", async () => {
      const response = await request(server)
        .post("/games")
        .send(game);
      expect(response.body).toEqual({ message: "game created" });
    });

    test("should return status code 422 if required fields were not provided", async () => {
      const response = await request(server)
        .post("/games")
        .send(gameNull);
      expect(response.status).toBe(422);
    });
  });

  describe("GET /games/:id", () => {
    test("should return status code 200", async () => {
      const response = await request(server).get("/games/1");
      expect(response.status).toBe(200);
    });

    test("should return status code 404", async () => {
      const response = await request(server).get("/games/34");
      expect(response.status).toBe(404);
    });

    test("response data should return body of id 1", async () => {
      const expected = [
        {
          _id: 1,
          title: "Pacman",
          genre: "Arcade",
          releaseYear: 1980
        }
      ];
      const response = await request(server).get("/games/1");
      expect(response.body).toEqual(expected);
    });
  });

  describe("DELETE /games/:id", () => {
    test("should return status code 200", async () => {
      const response = await request(server).delete("/games/1");
      expect(response.status).toBe(200);
    });

    test("should return status code 404", async () => {
      const response = await request(server).delete("/games/43");
      expect(response.status).toBe(404);
    });

    test("response data should return body of non existing game", async () => {
      const response = await request(server).delete("/games/43");
      expect(response.body).toEqual({ message: "404 not found" });
    });
  });
});
