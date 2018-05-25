const mongoose = require("mongoose");
const Request = require("supertest");
const server = require("./server");

const Game = require("./games/Game");

const testGame = {
  title: "Mount & Blade",
  genre: "Horses+Swords",
  releaseDate: "2010"
};

const defaultGame1 = {
  title: "title1",
  genre: "genre1",
  releaseDate: "releaseDate1"
};

const defaultGame2 = {
  title: "title2",
  genre: "genre2",
  releaseDate: "releaseDate2"
};

const defaultGame3 = {
  title: "title3",
  genre: "genre3",
  releaseDate: "releaseDate3"
};

const defaultGames = [defaultGame1, defaultGame2, defaultGame3];

describe("Games", () => {
  beforeAll(() => {
    return mongoose.connect("mongodb://localhost/test").then(() => {
      console.log("\n=== connected to TEST DB ===");
      return defaultGames.forEach(game => {
        return Game.create(game);
      });
    });
  });

  afterAll(() => {
    Game.remove().then(then => {
      return mongoose
        .disconnect()
        .then(() => console.log("\n=== disconnected from TEST DB ==="));
    });
  });

  beforeEach(() => {
    // return defaultGames.forEach(game => {
    //   return Game.create(game);
    // });
  });

  afterEach(() => {
    // return Game.remove();
  });

  it("runs the tests", () => {});

  // test the POST here
  describe("Posting games should work", () => {
    it("posting a game to /api/games with all fields filled should work correctly", async () => {
      const response = await Request(server)
        .post("/api/games")
        .send(testGame)
        .set("Accept", "application/json");

      const { status, type, body } = response;
      const game = body;
      const titleInGame = "title" in game;
      const _idInGame = "_id" in game;

      expect(status).toEqual(201);
      expect(type).toEqual("application/json");
      expect(titleInGame).toBe(true);
      expect(_idInGame).toBe(true);
    });
    it("should give error message and status 500 if there is no title", async () => {
      const noTitle = testGame;
      noTitle.title = "";

      const noTitleResponse = await Request(server)
        .post("/api/games")
        .send(noTitle)
        .set("Accept", "application/json");

      const { status, type, body } = noTitleResponse;
      const game = body;
      const titleInGame = "title" in game;
      const _idInGame = "_id" in game;

      expect(status).toEqual(500);
      expect(type).toEqual("application/json");
      expect(titleInGame).not.toBe(true);
      expect(_idInGame).not.toBe(true);
    });
    it("should give error message and status 500 if there is no genre", async () => {
      const noGenre = testGame;
      noGenre.genre = "";

      const noGenreResponse = await Request(server)
        .post("/api/games")
        .send(noGenre)
        .set("Accept", "application/json");

      const { status, type, body } = noGenreResponse;
      const game = body;
      const genreInGame = "genre" in game;
      const _idInGame = "_id" in game;

      expect(status).toEqual(500);
      expect(type).toEqual("application/json");
      expect(genreInGame).not.toBe(true);
      expect(_idInGame).not.toBe(true);
    });
  });

  // test the GET here
  describe("Getting games should work", () => {
    it("getting the route /api/games should return a list of game objects", async () => {
      const response = await Request(server).get("/api/games");

      const { status, type, body } = response;
      const games = body;

      expect(status).toEqual(200);
      expect(type).toEqual("application/json");
      expect(games).toHaveLength(4);
      games.forEach(game => {
        expect(game._id).toBeTruthy();
        expect(game.title).toBeTruthy();
        expect(game.genre).toBeTruthy();
        expect(typeof game.title).toBe("string");
        expect(typeof game.genre).toBe("string");
      });
    });
  });

  // Test the DELETE here
  describe("Deleting games should work", () => {
    it("deleting with the route /api/games/:id should delete the game with the given id", async () => {
      const getResponse = await Request(server).get("/api/games");
      const id = getResponse.body[0]._id;
      const response = await Request(server).delete(`/api/games/${id}`);

      const { status, type, body } = response;
      const game = body;

      expect(status).toEqual(204);
      expect(game).not.toContain("_id");
    });
    it("trying to delete using an id that does not exist should return an error", async () => {
      const id = "thisisnotavalididman";
      const response = await Request(server).delete(`/api/games/${id}`);

      const { status, type, body } = response;

      expect(status).toEqual(500);
      expect(type).toEqual("application/json");
      expect(body).not.toContain("_id");
    });
  });

  //couldn't get PUT testing stretch problem solved
  // describe("Putting games should work", () => {
  //   it("putting with the route /api/games/:id should update the game with the given id", async () => {
  //     const getResponse = await Request(server).get("/api/games");
  //     const id = getResponse.body[0]._id;
  //     const response = await Request(server)
  //       .put(`/api/games/${id}`)
  //       .send({ title: "newTitle" })
  //       .set("Accept", "application/json");

  //     const { status, type, body } = response;
  //     const game = body;

  //     expect(status).toEqual(200);
  //     expect(game.title).toEqual("newTitle");
  //   });
  // });
});
