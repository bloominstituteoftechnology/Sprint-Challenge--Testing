const mongoose = require("mongoose");
const request = require("supertest");
const Game = require("./games/Game");
const server = require("./api/server");

describe("The API Server", () => {
  beforeAll(() => {
    return mongoose
      .connect("mongodb://localhost/test")
      .then(() => console.log("\n=== connected to TEST DB ==="))
      .catch(err => {
        console.log("error connecting to TEST database, is MongoDB running?");
      });
  });

  afterAll(async () => {
    return mongoose
      .disconnect()
      .then(() => console.log("\n=== disconnected from TEST DB ==="));
  });

  let gameId;
  let game = {};
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const game = {
      // title: "Watchout for Bananas",
      // genre: "City Builder Survivel RPG",
      // releaseDate: "1990",
      title: "California Games",
      genre: "Sports",
      releaseDate: "June 1987"
    };
    
    Game.create(game);
    return;
  });

  afterEach(async () => {
    //   // clear the games collection.
    return Game.remove(game);
  });

  it("runs the tests", () => {});
  // test the POST here
  it("Returns a JSON object of the game and returns status code of 201", async () => {
    const expectedStatusCode = 201;
    const expectedNewGame = {
      title: "EU4",
      genre: "RTS",
      releaseDate: "June 2013"
    };

    const newGame = await request(server)
      .post("/api/games")
      .send(expectedNewGame);

    expect(newGame.body.title).toBe("EU4");
    expect(newGame.body.genre).toBe("RTS");
    expect(newGame.body.releaseDate).toBe("June 2013");
    expect(newGame.status).toBe(expectedStatusCode);
  });

  it("Returns an error when provided an incomplete object", async () => {
    const expectedStatusCode = 500;
    const expectedErrorMessage = "Error saving data to the db";
    const expectedNewGame = {
      genre: "RTS",
      releaseDate: "June 2013"
    };

    const newGame = await request(server)
      .post("/api/games")
      .send(expectedNewGame);

    expect(newGame.body.message).toBe(expectedErrorMessage);
    expect(newGame.status).toBe(expectedStatusCode);
  });

  // test the GET here
  it("Returns a JSON object of the existing games and returns a status 200", async () => {
    const expectedStatusCode = 200;

    const gameArray = await request(server).get("/api/games");

    expect(newGame.body[0].title).toBe(game.title);
    expect(newGame.body[0].genre).toBe(game.genre);
    expect(newGame.body[0].releaseDate).toBe(game.releaseDate);
    expect(newGame.status).toBe(expectedStatusCode);
  });
  it("Returns 404 if endpoint cant be reached", async () => {
    const expectedStatusCode = 404;

    const gameArray = await request(server).get("/api/wrongway");

    expect(gameArray.status).toBe(expectedStatusCode);
  });

  // Test the DELETE here
  it("Returns an empty JSON object and a No Content status code of 204", async () => {
    const expectedStatusCode = 204;

    const existingGame = await request(server).get("/api/games");
    const existingGameId = existingGame.body[0]._id;
    const deletedGame = await request(server).delete(
      `/api/games/${existingGameId}`
    );

    expect(deletedGame.body).toEqual({});
    expect(deletedGame.status).toEqual(expectedStatusCode);
  });

  it("Returns an error message if the id is not found", async () => {
    const expectedStatusCode = 404;
    const expectedErrorMessage = "Game not found";
    const existingGameId = "thisaintreal";
    const deletedGame = await request(server).delete(
      `/api/games/${existingGameId}`
    );

    expect(deletedGame.body.message).toBe(expectedErrorMessage);
    expect(deletedGame.status).toBe(expectedStatusCode);
  });
});
