const mongoose = require("mongoose");
const request = require("supertest");
const Game = require("./games/Game");
const server = require("./server");

async function createGame() {
  const game = { title: "Metal Gear", genre: "Tactical Espionage Action" };

  const savedGame = await Game.create(game);
  return savedGame._id;
}

describe("Games", () => {
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
    gameId = await createGame();
  });

  afterEach(() => {
    return Game.remove();
    //   // clear collection.
  });

  it("runs the tests", () => {});

  // test the POST here
  describe("POST Testing", () => {
    it("It should respond to post requests", () => {
      let tempTitle = { title: "LOTR", genre: "Middle Earth" };
      return request(server)
        .post(`/api/games/`)
        .send(tempTitle)
        .then(response => {
          expect(response.statusCode).toBe(201);
        });
    });
    it("It should fail when sent insufficient data", () => {
      let tempTitle = { title: "LOTR" };
      return request(server)
        .post(`/api/games/`)
        .send(tempTitle)
        .then(response => {
          expect(response.statusCode).toBe(500);
        });
    });
  });

  // test the GET here
  describe("GET Testing", () => {
    it("It should respond 200 to get requests at /api/games/", async () => {
      const response = await request(server).get("/api/games/");

      expect(response.status).toEqual(200);
      expect(response.type).toEqual("application/json");
    });
    it("It should return values of items in database", async () => {
      const response = await request(server).get("/api/games/");

      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject([{ genre: "Middle Earth" }]);
    });
  });

  // Test the DELETE here
  describe("DEL Testing", () => {
    it("It should respond to delete requests on game id", () => {
      return request(server)
        .delete(`/api/games/${gameId}`)
        .then(response => {
          expect(response.statusCode).toBe(204);
        });
    });
    it("It should fail when sent wrong id", () => {
      return request(server)
        .delete(`/api/games/${gameId}1123`)
        .then(response => {
          expect(response.statusCode).toBe(500);
        });
    });
  });
});
