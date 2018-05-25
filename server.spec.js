const mongoose = require("mongoose");
const request = require("supertest");
const server = require("./server");

const Game = require("./games/Game");

describe("Games", () => {
  beforeAll(() => {
    return mongoose
      .connect("mongodb://localhost/manymanymany")
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
    let myGame = new Game({
      title: "yasins awesome game",
      releaseDate: Date.now,
      genre: "RPG"
    });
    myGame
      .save()
      .then(game => {
        myGame = game;
        gameId = game._id;
      })
      .catch(err => {
        console.error(err);
      });
  });

  afterEach(() => {
    //   // clear collection.
    Game.remove({}, err => {
      if (err) console.log(`There was an error removing the game.`);
      else console.log(`The game was removed successfully.`);
    });
  });

  // test the POST here

  it("should create a new game", async () => {
    const newGame = {
      title: "waynes world",
      genre: "action",
      releaseDate: Date.now
    };
    const expected = "waynes world";

    const response = await request(server)
      .post("/api/games")
      .send(newGame);

    expect(response.status).toEqual(201);
    expect(response.body.title).toEqual(expected);
  });

  // test the GET here
  it("should return a list of games", async () => {
    const response = await request(server).get("/api/games");
    expect(response.status).toEqual(200);
    expect(response.body[0].title).toEqual("yasins awesome game");
  });

  // Test the DELETE here
  it("should remove the game with the given id from the database", async () => {
    const newGame = {
      title: "lets delete waynes world chapter 2",
      genre: "action",
      releaseDate: Date.now
    };
    const game = await Game.create(newGame);
    request(server)
      .delete("api/games/${game.id}")
      .expect(204);
  });

  it("should return an error if a bad ID is sent", async () => {
    request(server)
      .delete("/api/game/222")
      .expect("Content-Type", /json/)
      .expect(res => res.message === "Game not found")
      .expect(404);
  });
});
