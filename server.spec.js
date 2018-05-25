const mongoose = require("mongoose");
const request = require("supertest");
const server = require("./server");

const Game = require("./games/Game");

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

  beforeEach(done => {
    const newGame = new Game({
      title: "Ducktales",
      genre: "platformer",
      releaseDate: "1994"
    });
    newGame.save((err, savedGame) => {
      if (err) {
        console.log(err);
      } else {
        gameId = savedGame._id;
        console.log(gameId);
      }
      done();
    });
  });

  afterEach(() => {
    return Game.remove();
  });
  describe("server POST routes", () => {
    it("should add a new game after making post request", async () => {
      const game = {
        title: "Captain Tsubasa",
        genre: "sports",
        releaseDate: "1992"
      };
      const response = await request(server)
        .post("/api/games")
        .send(game);

      expect(response.status).toEqual(201);
      expect(response.type).toEqual("application/json");
      expect(response.body).toHaveProperty("_id");
      expect(response.body).toHaveProperty("title");
      expect(response.body).toHaveProperty("genre");
    });
    it("should not allow to add game if missing a title", async () => {
      const game = {
        genre: "sports",
        releaseDate: "1992"
      };
      const response = await request(server)
        .post("/api/games")
        .send(game);

      expect(response.status).toEqual(500);
      expect(response.type).toEqual("application/json");
      expect(response.body.message).toEqual("Error saving data to the DB");
    });
    it("should not allow to add game if missing genre", async () => {
      const game = {
        title: "WHAM!",
        releaseDate: "1992"
      };
      const response = await request(server)
        .post("/api/games")
        .send(game);

      expect(response.status).toEqual(500);
      expect(response.type).toEqual("application/json");
      expect(response.body.message).toEqual("Error saving data to the DB");
    });
  });
  describe("server GET route", () => {
    it("should display all games from db with correct info", async () => {
      const response = await request(server).get("/api/games");

      expect(response.status).toEqual(200);
      expect(response.type).toEqual("application/json");
      expect(response.body[0]).toHaveProperty("_id");
      expect(response.body[0]).toHaveProperty("title");
      expect(response.body[0]).toHaveProperty("genre");
      expect(response.body[0].title).toEqual("Ducktales");
      expect(response.body[0].genre).toEqual("platformer");
      expect(response.body.message).not.toEqual(
        "Something really bad happened"
      );
    });
    it("should throw 404 if wrong path provided", async () => {
      const response = await request(server).delete(`/api/gam`);

      expect(response.status).toEqual(404);
    });
  });
  describe("server PUT route", () => {
    it("should update a game if provided correct info", async () => {
      const updates = { id: `${gameId}`, title: "Goal 3", genre: "sports" };
      const response = await request(server)
        .put(`/api/games/${gameId}`)
        .send(updates);

      expect(response.status).toEqual(200);
      expect(response.type).toEqual("application/json");
      expect(response.body).toHaveProperty("_id");
      expect(response.body).toHaveProperty("title");
      expect(response.body).toHaveProperty("genre");
      expect(response.body.title).toEqual("Goal 3");
    });
    it("should not update if id is not present", async () => {
      const updates = { title: "Goal 3", genre: "sports" };
      const response = await request(server)
        .put(`/api/games/${gameId}`)
        .send(updates);

      expect(response.status).toEqual(422);
    });
    it("should not update if title is not present", async () => {
      const updates = { id: `${gameId}`, genre: "sports" };
      const response = await request(server)
        .put(`/api/games/${gameId}`)
        .send(updates);

      expect(response.status).toEqual(422);
    });
    it("should throw 404 if game is not found", async () => {
      const updates = {
        id: `5b0846b93f1c8b3a504f2caa`,
        title: "Goal 3",
        genre: "sports"
      };
      const response = await request(server)
        .put(`/api/games/5b0342b93f1c8b3a504f2caa`)
        .send(updates);

      expect(response.status).toEqual(404);
    });
    it("should throw 404 if reached wrong route", async () => {
      const updates = {
        id: `${gameId}`,
        title: "Goal 3",
        genre: "sports"
      };
      const response = await request(server).put(`/api/games`);

      expect(response.status).toEqual(404);
    });
  });
  describe("server DELETE route", () => {
    it("should remove game from database if provided correct id", async () => {
      const response = await request(server).delete(`/api/games/${gameId}`);

      expect(response.status).toEqual(204);
    });
    it("should throw error if no game found", async () => {
      const response = await request(server).delete(
        `/api/games/5b082076bae0333cc86a5d45`
      );

      expect(response.status).toEqual(404);
      expect(response.body.message).toEqual("Game not found");
    });
    it("should throw error if no id or invalid id provided", async () => {
      const response = await request(server).delete(`/api/games/somewrongid`);

      expect(response.status).toEqual(500);
    });
  });
});
