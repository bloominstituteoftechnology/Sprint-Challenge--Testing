const mongoose = require("mongoose");
const request = require("supertest");

const server = require("./server");
const Game = require("./games/Game");

describe("Games", () => {
  beforeAll(() => {
    return mongoose
      .connect("mongodb://localhost/test")
      .then(() => console.log("\n Connected to TEST DB"));
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log("\n Disconnected from TEST DB"));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(done => {
    const newGame = new Game({
      title: "Game 1",
      genre: "trivia",
      releaseDate: "BC 1"
    });
    newGame.save((err, savedGame) => {
      if (err) console.log(err);

      gameId = savedGame._id;
      console.log(gameId);

      done();
    });
  });

  afterEach(() => {
    return Game.remove();
  });

  describe("POST to /api/games", () => {
    it("should create a new game in TEST db", async () => {
      const game = {
        title: "Game 2",
        genre: "trivia",
        releaseDate: "BC 2"
      };
      const response = await request(server)
        .post("/api/games")
        .send(game);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("_id");
      expect(response.body).toHaveProperty("title");
      expect(response.body).toHaveProperty("genre");
    });
  });

  describe("GET from /api/games", () => {
    it("should display all games from TEST db", async () => {
      const response = await request(server).get("/api/games");

      expect(response.status).toEqual(200);
    });
  });

  describe("PUT to api/games/:id", () => {
    it("should update a game in TEST db", async () => {
      const updates = {
        id: `${gameId}`,
        title: "Game 3",
        genre: "sports"
      };

      const response = await request(server)
        .put(`/api/games/${gameId}`)
        .send(updates);

      expect(response.status).toEqual(200);
      expect(response.type).toEqual("application/json");
    });
  });

  describe("DELETE from /api/games/:id", () => {
    it("should delete the specified ID game from TEST db", async () => {
      const response = await request(server).delete(`/api/games/${gameId}`);

      expect(response.status).toEqual(204);
    });
  });
});
