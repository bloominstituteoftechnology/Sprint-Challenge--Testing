const mongoose = require("mongoose");

const request = require("supertest");

const server = require("./server");

const Game = require("./games/Game");

const faker = describe("Games", () => {
  beforeAll(() => {
    return mongoose
      .connect("mongodb://localhost/test")
      .then(() => console.log("\n=== connected to TEST DB ==="));
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
    const game = { title: "Starcraft", genre: "RTS", releaseDate: "1998" };
    const savedGame = Game.create(game); // new + save
  });

  afterEach(() => {
    //   // clear collection.
    return Game.remove();
  });

  it("runs the tests", () => {});

  // test the POST here
  describe("POST to /api/games", () => {
    it("should return server OK (200)", async () => {
      const response = await request(server)
        .post("/api/games")
        .send({ title: "Starcraft", genre: "RTS", releaseDate: "1998" });
      expect(response.status).toEqual(201);
    });

    it("should return POST as method", () => {
      const response = request(server)
        .post("/api/games")
        .send({ title: "Starcraft", genre: "RTS", releaseDate: "1998" });
      expect(response.method).toEqual("POST");
    });
  });

  // test the GET here
  describe("GET /api/games", () => {
    it("should respond with json; 200 if successful", () => {
      const response = request(server).get("/api/games");
      request(server)
        .get("/api/game")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  // Test the DELETE here
  describe("DELETE /api/games", () => {
    // it("should respond with json; 200 if successful", () => {
    //   request(server)
    //     .del("/api/game" + )
    //     .set("Accept", "application/json")
    //     .expect("Content-Type", /json/)
    //     .expect(200);
    // });
  });
});
