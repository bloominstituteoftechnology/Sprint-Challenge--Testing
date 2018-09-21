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
            id: 1,
            title: "Pacman",
            genre: "Arcade",
            releaseYear: 1980
          });
        });
    });
  });

  describe("POST route", () => {
    it("should return 201 status code on success", () => {
      const newGame = {
        title: "Super Mario Bros",
        genre: "Platformer",
        releaseYear: 1985
      };

      return request(server)
        .post("/games")
        .send(newGame)
        .then(res => {
          expect(res.status).toEqual(201);
        });
    });

    it("should return status 422 on bad request", () => {
      return request(server)
        .post("/games")
        .send({ title: "Duck Hunt" })
        .then(res => {
          expect(res.status).toEqual(422);
        });
    });

    it("should return 1 on successful addition", () => {
      const newGame = {
        title: "Duck Hunt",
        genre: "Shooter",
        releaseYear: 1985
      };

      return request(server)
        .post("/games")
        .send(newGame)
        .then(res => {
          expect(res.body).toEqual(1);
        });
    });

    it("should reject request with 405 when duplicating a title", () => {
      return request(server)
        .post("/games")
        .send({ title: "Super Mario Bros", genre: "Platformer" })
        .then(res => {
          expect(res.status).toEqual(405);
        });
    });
  });
});
