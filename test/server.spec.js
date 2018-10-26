const request = require("supertest");
const server = require("../server.js");
const db = require("../database/games.js");

describe("Game Routes", () => {
  describe("Gets all the old ass games", () => {
    it("200 (OK)", async () => {
      const response = await request(server).get("/games");

      expect(response.status).toEqual(200);
    });
    it("Displays a list of all the games", async () => {
      const response = await request(server).get("/games");

      expect(response.body).toEqual(db.games);
    });
    // ***Go to games in the database and comment it out. Then run this w/o skip*** //
    it.skip("Returns an empty array if no games avaliable", async () => {
      const response = await request(server).get("/games");
      expect(response.body).toEqual([]);
    });
  });
});

describe("POST/Adds a game", () => {
  it("Displays all the games (also the newGame)", async () => {
    const updatedData = db.games;
    const newGame = db.newGame;
    const response = await request(server)
      .post("/games")
      .send(newGame);
    expect(response.body).toEqual(updatedData);
  });
  it("200 (OK) status code", async () => {
    const newGame = db.newGame;
    const response = await request(server)
      .post("/games")
      .send(newGame);
    expect(response.status).toEqual(200);
  });
  it("422 status code if missing required field", async () => {
    const response = await request(server).post("/games");
    expect(response.status).toEqual(422);
  });
});
