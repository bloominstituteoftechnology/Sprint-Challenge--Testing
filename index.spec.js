const mongoose = require("mongoose");

const Game = require("./games/Game");
const request = require("supertest");
const server = require("./api/server.js");

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

  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    await Game.create({
      title: "California Games",
      genre: "Sports",
      releaseDate: "June 1987"
    });
  });

  afterEach(async () => {
    await Game.remove({}, err => {
      if (err) {
        console.log(err);
      }
      return;
    });
  });

  it("runs the tests", () => {});

  // test the POST here
  it("should be able to create a new game with a post request", async () => {
    const response = await request(server)
      .post("/api/games")
      .send({
        title: "Kirby's Adventure",
        genre: "Platformer",
        releaseDate: "March 1993"
      });

    const { genre, releaseDate, title } = response.body;

    expect(response.status).toEqual(201);
    expect({ genre, releaseDate, title }).toEqual({
      genre: "Platformer",
      releaseDate: "March 1993",
      title: "Kirby's Adventure"
    });
    expect(response.type).toEqual("application/json");
  });

  // test the GET here

  it("should be able to retrieve the list of games with a get request", async () => {
    const response = await request(server).get("/api/games");

    const { genre, releaseDate, title } = response.body[0];

    expect(response.status).toEqual(200);
    expect({ genre, releaseDate, title }).toEqual({
      genre: "Sports",
      releaseDate: "June 1987",
      title: "California Games"
    });
    expect(response.type).toEqual("application/json");
  });

  // Test the DELETE here
});
