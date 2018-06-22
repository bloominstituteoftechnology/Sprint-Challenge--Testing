const mongoose = require("mongoose");
const request = require("supertest");
const server = require("./api/server");
const Game = require("./games/Game");

describe("The API Server", () => {
  beforeAll(() => {
    return mongoose
      .connect("mongodb://localhost/test")
      .then(() => console.log("\n=== connected to TEST DB ==="))
      .catch(err => {
        console.log("error connecting to TEST database, is MongoDB running?");
      });
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log("\n=== disconnected from TEST DB ==="));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    return Game.create({
      title: "California Games",
      genre: "Sports",
      releaseDate: "June 1987"
    });
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove();
  });

  it("runs the tests", () => {});

  // test the POST here
  describe("POST: /api/games", () => {
    it("should return a 201 status code and a JSON object fron the /api/games route", async () => {
      const response = await request(server)
        .post("/api/games")
        .send({
          title: "California Games",
          genre: "Sports",
          releaseDate: "June 1987"
        });

      expect(response.status).toBe(201);
      expect(typeof response.body).toBe("object");
      expect(response.type).toEqual("application/json");
      expect(response.body.title).toBe("California Games");
      expect(response.body.genre).toBe("Sports");
      expect(response.body.releaseDate).toBe("June 1987");
    });

    it("should return a 500 status code if title or genre is not provided", async () => {
      const response = await request(server)
        .post("/api/games")
        .send({
          title: "California Games",
          releaseDate: "June 1987"
        });

      expect(response.status).toBe(500);
    });
  });

  // test the GET here
  describe("GET: /api/games", () => {
    it("should return a 200 status code", async () => {
      const games = await request(server).get("/api/games");

      expect(games.status).toBe(200);
    });

    it("Should return the test game that we set up in the beforeEach hook", async () => {
      const games = await request(server).get("/api/games");

      expect(games.body[0].title).toEqual("California Games");
      expect(games.body[0].genre).toEqual("Sports");
      expect(games.body[0].releaseDate).toEqual("June 1987");
    });
  });

  // Test the DELETE here
  describe("DELETE: /api/games", () => {
    it("should return a 204 status code if successful", async () => {
      const games = await request(server).get("/api/games");

      const deleted = await request(server).delete(
        `/api/games/${games.body[0]._id}`
      );

      expect(deleted.status).toBe(204);
    });

    it("should return a 404 status code if id does not exist", async () => {
      const deleted = await request(server).delete(
        "/api/games/5b2d3a8ed61e13104c5df9ec"
      );

      expect(deleted.status).toBe(404);
    });
  });
});
