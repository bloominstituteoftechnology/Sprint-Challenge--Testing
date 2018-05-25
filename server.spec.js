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

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const expectedBody = {
      title: "Street Fighter",
      genre: "fighting",
      releaseDate: "1980"
    };
    const game = new Game(expectedBody);
    return game.save().then(game => {
      console.log(game);
    });
  });

  afterEach(() => {
    //   // clear collection.
    Game.remove({}, function(err) {
      console.log("collection removed");
    });
  });

  it("runs the tests", () => {
    const expectedBody = { api: "running!" };

    request(server)
      .get("/")
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.type).toEqual("application/json");
        expect(res.body).toEqual(expectedBody);
      });
  });

  // test the POST here
  const expectedBody = {
    title: "Street Fighter",
    genre: "fighting",
    releaseDate: "1980"
  };
  const { title, genre, releaseDate } = expectedBody;

  it("should have a request body with a title, genre, and releaseDate as strings", () => {
    expect(typeof title).toBe("string");
    expect(title.length).toBeGreaterThan(0);
    expect(typeof genre).toBe("string");
    expect(genre.length).toBeGreaterThan(0);
    expect(typeof releaseDate).toBe("string");
    expect(releaseDate.length).toBeGreaterThan(0);
  });

  it("should return status code 201 and json game object from /api/games", async () => {
    const response = await request(server)
      .post("/api/games")
      .send(expectedBody);

    expect(response.status).toEqual(201);
    expect(response.type).toEqual("application/json");
    expect(response.body.title).toEqual(expectedBody.title);
    expect(response.body.genre).toEqual(expectedBody.genre);
    expect(response.body.releaseDate).toEqual(expectedBody.releaseDate);
  });

  // test the GET here
  it("should return a list and json object from /api/games", async () => {
    const response = await request(server).get("/api/games");
    const game = response.body[0];

    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(1);
    expect(typeof game).toBe("object");
  });

  it("should return a game object from /api/games", async () => {
    const response = await request(server).get("/api/games");
    const game = response.body[0];

    expect(game.title).toEqual(expectedBody.title);
    expect(game.genre).toEqual(expectedBody.genre);
    expect(game.releaseDate).toEqual(expectedBody.releaseDate);
  });

  // Test the DELETE here [IN PROGRES......]
  it("should have an ID of an existing game in the route parameter", async () => {
    const game = await request(server).get("/api/games");
    const gameId = game.body[0]._id;

    expect(game.body[0]).toBeTruthy();
    expect(typeof gameId).toEqual("string");
    expect(gameId.length).toBeGreaterThan(0);
  });

  it("should delete a book give an ID", async () => {
    const game = await request(server).get("/api/games");
    const gameId = game.body[0]._id;

    const response = await request(server).delete(`/api/games/${gameId}`);

    expect(response.status).toEqual(204);
    expect(typeof response.body).toBe("object");
    expect(response.body.title).toBeFalsy();
    expect(response.body.genre).toBeFalsy();
    expect(response.body.releaseDate).toBeFalsy();
  });
});
