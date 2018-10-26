const request = require("supertest");
const server = require("./server.js");

describe("server.js", () => {
  describe("POST /games", () => {
    it("should return a status code 201 if valid data is passed in", async () => {
      await request(server)
        .post("/games")
        .send({ title: "Pacman", genre: "Arcade", releaseYear: 1980 })
        .expect("Content-Type", /json/)
        .expect(201);
    });
  });
});
