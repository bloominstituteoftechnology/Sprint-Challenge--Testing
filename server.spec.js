const request = require("supertest");

const server = require("./server.js");

game = {
  title: "Mario", // required
  genre: "Arcade", // required
  releaseYear: 1981 // not required
};

duplicateGame = {
  title: "Pacman", // required
  genre: "Arcade", // required
  releaseYear: 1980 // not required
};

describe("server.js", () => {
  describe("GET /", () => {
    it("should return HTTP status code 200 OK", async () => {
      const response = await request(server).get("/");
      const actual = response.status;
      const expected = 200;
      expect(actual).toEqual(expected);
    });
    it("should return in JSON format", async () => {
      const response = await request(server).get("/");
      const actual = response.type;
      const expected = "application/json";
      expect(actual).toEqual(expected);
    });
    it("should return expected data", async () => {
      const response = await request(server).get("/");
      const actual = response.body;
      const expected = { api: "running" };
      expect(actual).toEqual(expected);
    });
  });
  describe("POST /games", () => {
    it("should return HTTP status code 201 Created", async () => {
      const response = await request(server)
        .post("/games")
        .send(game);
      const actual = response.status;
      const expected = 201;
      expect(actual).toEqual(expected);
    });
    it("should return HTTP status code 422 Unprocessable Entity", async () => {
      const response = await request(server)
        .post("/games")
        .send({
          title: false, // required
          genre: false, // required
          releaseYear: 1980 // not required
        });
      const actual = response.status;
      const expected = 422;
      expect(actual).toEqual(expected);
    });
    it("should return HTTP status code 405 Method Not Allowed", async () => {
      const response = await request(server)
        .post("/games")
        .send(duplicateGame);
      const actual = response.status;
      const expected = 405;
      expect(actual).toEqual(expected);
    });
    it("should return in JSON format", async () => {
      const response = await request(server)
        .post("/games")
        .send(game);
      const actual = response.type;
      const expected = "application/json";
      expect(actual).toEqual(expected);
    });
    it("should return expected data", async () => {
      const response = await request(server)
        .post("/games")
        .send(game);
      const actual = response.body;
      const expected = game;
      expect(actual).toEqual(expected);
    });
  });
  describe("GET /games", () => {
    it("should return HTTP status code 200 OK", async () => {
      const response = await request(server).get("/games");
      const actual = response.status;
      const expected = 200;
      expect(actual).toEqual(expected);
    });
    it("should return in JSON format", async () => {
      const response = await request(server).get("/games");
      const actual = response.type;
      const expected = "application/json";
      expect(actual).toEqual(expected);
    });
    it("should return an array", async () => {
      const response = await request(server).get("/games");
      const actual = Array.isArray(response.body);
      const expected = true;
      expect(actual).toEqual(expected);
    });
  });
});
