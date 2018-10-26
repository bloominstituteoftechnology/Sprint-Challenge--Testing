const request = require("supertest");

const server = require("./api/server.js");

const games = [
  {
    id: "1",
    title: "Final Fantasy VII",
    genre: "RPG",
    releaseDate: 1 / 31 / 1997
  },
  {
    id: "2",
    title: "Final Fantasy VIII",
    genre: "RPG",
    releaseDate: 2 / 11 / 1999
  },
  {
    id: "3",
    title: "Final Fantasy IX",
    genre: "RPG",
    releaseDate: 7 / 7 / 2000
  },
  {
    id: "4",
    title: "Final Fantasy X",
    genre: "RPG",
    releaseDate: 7 / 19 / 2001
  },
  {
    id: "5",
    title: "The Witcher 3",
    genre: "RPG",
    releaseDate: 5 / 19 / 2015
  }
];

describe("server", () => {
  it("can run tests", () => {
    expect(true).toBeTruthy();
  });
});

describe("GET /games", () => {
  it("should return and array", async () => {
    const response = await request(server).get("/games");
    expect(Array.isArray(response.body)).toBeTruthy();
  });
  it("should return a 200 status", async () => {
    const response = await request(server).get("/games");
    expect(response.status).toEqual(200);
  });
  it("should gimme my games", async () => {
    const response = await request(server).get("/games");
    expect(response.body).toEqual(games);
  });
});

describe("POST /games", () => {
  it("should return a 200 status", async () => {
    const newGame = {
      title: "Cool Game",
      genre: "Shooter",
      releaseDate: 10 / 26 / 2018
    };
    const response = await request(server)
      .post("/games")
      .send(newGame);
    expect(response.status).toBe(200);
  });
  it("should gimme a game", async () => {
    const newGame = {
      id: 6,
      title: "Cool Game",
      genre: "Shooter"
      //   releaseDate: 10 / 26 / 2018
    };
    const response = await request(server)
      .post("/games")
      .send(newGame);
    expect(response.body).toEqual(newGame);
  });
  it("should return 422 status if missing info", async () => {
    const newGame = {
      genre: "Shooter",
      releaseDate: 10 / 26 / 2018
    };
    const response = await request(server)
      .post("/games")
      .send(newGame);
    expect(response.status).toBe(422);
  });
});
