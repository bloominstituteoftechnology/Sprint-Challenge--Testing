const request = require("supertest");

const server = require("./index.js");

describe("server.js", () => {
  describe("index", () => {
    it("should return status OK", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
  });

  describe("GET route", () => {
    it("should return status OK", () => {
      return request(server)
        .get("/games")
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

    it("should return an array of games", () => {
      return request(server)
        .get("/games")
        .then(res => {
          expect(res.type).toEqual("application/json");
        });
    });

    it("should include Pacman by default", () => {
      return request(server)
        .get("/games")
        .then(res => {
          expect(res.body).toContainEqual({
            title: "Pacman",
            genre: "Arcade",
            releaseYear: 1980
          });
        });
    });
  });
});
