const mongoose = require("mongoose");
const server = require("../api/server");
const Game = require("./Game");
const tester = require("supertest");

describe("The Game Model", () => {
  let g1;
  let g2;

  beforeAll(() => {
    return mongoose
      .connect("mongodb://localhost/test")
      .then(() => console.log("\n=== connected to TEST DB ==="))
      .catch(err => {
        console.log("error connecting to TEST database, is MongoDB running?");
      });
  });

  beforeEach(() => {
    (g1 = {
      title: "Moises",
      genre: "Hacker",
      releaseDate: "unknown"
    }),
      (gamer2 = {
        title: "Myke",
        genre: "N00b",
        releaseDate: "December 1989"
      });
  });

  afterEach(() => {
    return Game.remove();
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log("\n=== disconnected from TEST DB ==="));
  });

  it("runs the tests", async () => {
    // test away!
    const player = await tester(server)
      .post("/api/games")
      .send(g1);
    expect(player.status).toEqual(201);
    expect(player.body.title).toEqual("Moises");
    // expect(res.data[0].Game).toEqual(Game.title);
  });
});
