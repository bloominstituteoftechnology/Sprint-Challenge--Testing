const request = require("supertest");
const server = require("../server.js");
const gamesDb = require("../db/games.js");

describe("server.js", () => {
  describe("GET / (test route)", () => {
    it("returns a 200 (OK) status code", async () => {
      const response = await request(server).get("/");

      expect(response.status).toEqual(200);
    });

    it("correctly passing req.body check", async () => {
      const expectedBody = { api: "running" };
      const response = await request(server).get("/");

      expect(response.body).toEqual(expectedBody);
    });
  });

  describe("Game Routes", () => {
    describe("GET ALL games", () => {
      it("returns a 200 (OK) status code", async () => {
        const response = await request(server).get("/games");

        expect(response.status).toEqual(200);
      });
      it("should display a list of all games", async () => {
        const response = await request(server).get("/games");

        expect(response.body).toEqual(gamesDb.games);
      });
      // (unskip and comment out games in db to test)
      it.skip("should return empty array if no games are stored", async () => {
        const response = await request(server).get("/games");
        expect(response.body).toEqual([]);
      });
    });
  });

  describe("POST new game", () => {
    it("should display all games (including newGame)", async () => {
      const updatedGameData = gamesDb.games;
      let newGame = gamesDb.newGame;
      const response = await request(server)
        .post("/games")
        .send(newGame);
      // 3 is the index of our new game
      // expect(response.body[3]).toEqual(updatedGameData[3]);
      expect(response.body).toEqual(updatedGameData);
    });
    it("returns a 200 (OK) status code", async () => {
      const response = await request(server).post("/games");

      expect(response.status).toEqual(200);
    });
  });
});
