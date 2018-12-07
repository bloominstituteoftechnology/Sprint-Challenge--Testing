const request = require("supertest");
const server = require("./API/server");

const allGameData = {
  title: "Pacman", // required
  genre: "Arcade", // required
  releaseYear: 1980 // not required
};

const partialGameData = {
  title: "Pacman", // required
  // genre: null, // required but left out for the test
  releaseYear: 1980 // not required
};

describe("Games", () => {
  describe("POST /games endpoint", () => {
    it("should return status 201", async () => {
      let response = await request(server)
        .post("/games")
        .send(allGameData);
      expect(response.status).toBe(201);
    });

    it("should return a success message", async () => {
      let response = await request(server)
        .post("/games")
        .send(allGameData);
      expect(response.body).toEqual({ message: "Pacman successfully added" });
    });
    it("should return status 422 if information is incomplete", async () => {
      let response = await request(server)
        .post("/games")
        .send(partialGameData);
      expect(response.status).toBe(422);
    });
  });

  describe("GET /games endpoint", () => {
    it("should return status code 200 when successful", async () => {
      let response = await request(server).get("/games");
      expect(response.status).toBe(200);
    });
    it("should return an empty array if no games are in the db", async () => {
      let response = await request(server).get("/games");
      expect(response.body).toEqual([]);
    });
    it("should return an array of games", async () => {
      let response = await request(server).get("/games");
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
