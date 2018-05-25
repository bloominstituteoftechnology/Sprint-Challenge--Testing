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

  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const game = { title: "Starcraft", genre: "RTS", releaseDate: "1998" };
    const savedGame = await Game.create(game); // new + save
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
        .send({ title: "CS:GO", genre: "FPS", releaseDate: "2011" });
      expect(response.status).toEqual(201);
      expect(response.body.genre).toEqual("FPS");
    });

    it("should return POST as method", async () => {
      const response = await request(server)
        .post("/api/games")
        .send({ title: "Warcraft 3", genre: "RTS", releaseDate: "2002" });
      expect(response.body.title).toEqual("Warcraft 3");
      expect(response.status).toEqual(201);
    });
  });

  // test the GET here
  describe("GET /api/games", () => {
    it("should respond with json; 200 if successful", async () => {
      const response = await request(server).get("/api/games");
      expect(response.status).toEqual(200);
      expect(response.body[0].title).toEqual("Starcraft");
    });
  });

  // Test the DELETE here
  describe("DELETE /api/games", () => {
    it("should return 'No Content' (204)", async () => {
      // inquire for id with GET first
      const response = await request(server).get("/api/games");
      const id = response.body[0]._id

      // use id to DELETE
      const responseDel = await request(server).delete(`/api/games/${id}`);
      expect(responseDel.status).toEqual(204);
    });
  });
});
