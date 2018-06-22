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
    const testGame = await Game.create({
      title: "California Games",
      genre: "Sports",
      releaseDate: "June 1987"
    });
    gameId = testGame._id;
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

    const { genre, releaseDate, title, __v } = response.body;

    expect(response.status).toEqual(201);
    expect({ genre, releaseDate, title, __v }).toEqual({
      title: "Kirby's Adventure",
      genre: "Platformer",
      releaseDate: "March 1993",
      __v: 0
    });
    expect(response.type).toEqual("application/json");
  });

  it("should return status 400 when given a bad object to post", async () => {
    const response = await request(server)
      .post("/api/games")
      .send({
        titlez: "Kirby's Adventure",
        genrez: "Platformer",
        releaseDatez: "March 1993"
      });

    expect(response.status).toEqual(400);

    expect(response.type).toEqual("application/json");
  });

  // test the GET here

  it("should be able to retrieve the list of games with a get request", async () => {
    const response = await request(server).get("/api/games");

    const { genre, releaseDate, title } = response.body[0];

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([
      {
        title: "California Games",
        genre: "Sports",
        releaseDate: "June 1987",
        _id: `${gameId}`,
        __v: 0
      }
    ]);
    expect(response.body.length).toBe(1);
    expect(response.type).toEqual("application/json");
  });

  // Test the DELETE here
  it("should be able to delete a game with a delete request", async () => {
    const response = await request(server).delete(`/api/games/${gameId}`);

    expect(response.status).toEqual(204);
    expect(response.body).toEqual({});
    expect(response.type).toEqual("");
  });

  // Test the PUT here
  it("should be able to edit a game with a put request", async () => {
    const response = await request(server)
      .put(`/api/games/${gameId}`)
      .send({
        title: "Kirby's Adventure",
        genre: "Platformer",
        releaseDate: "March 1993"
      });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      title: "Kirby's Adventure",
      genre: "Platformer",
      releaseDate: "March 1993",
      _id: `${gameId}`,
      __v: 0
    });
    expect(response.type).toEqual("application/json");
  });
});
