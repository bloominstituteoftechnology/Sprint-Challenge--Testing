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

  describe("GET /games", () => {
    it("should return a list of the games, with a status code of 200", async () => {
      await request(server)
        .get("/games")
        .expect("Content-Type", /json/)
        .expect(200, [
          { id: 1, title: "Pacman", genre: "Arcade", releaseYear: 1980 }
        ]);
    });

    it("should always return an array of data", async () => {
      await request(server)
        .get("/games")
        .then(response => {
          typeof response === "array";
        });
    });
  });
});
