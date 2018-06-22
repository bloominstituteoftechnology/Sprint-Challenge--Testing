const mongoose = require("mongoose");
const server = require("./api/server");
const request = require("supertest");

const Game = require("./games/Game");

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
  let gameId2;
  let gameId3;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(async () => {
    const firstGame = await Game.create({
      title: "California Games",
      genre: "Sports",
      releaseDate: "June 1987"
    });
    gameId = firstGame._id;
    const secondGame = await Game.create({
      title: "Kitten Tumble",
      genre: "Simulator",
      releaseDate: "June 2018"
    });
    gameId2 = secondGame._id;
    const thirdGame = await Game.create({
      title: "DoTheseAddBackward",
      genre: "Testing",
      releaseDate: "June 2018"
    });
    gameId3 = thirdGame._id;

    return Game.find();
  });

  afterEach(() => {
    return Game.remove();
  });

  describe("POST method", () => {
    it("should create a game and return the game", async () => {
      const actual = { title: "Mario", genre: "Racing" };
      const expected = { title: "Mario", genre: "Racing" };
      const response = await request(server)
        .post("/api/games")
        .send(actual);

      expect(response.body.title).toEqual(expected.title);
      expect(response.body.genre).toEqual(expected.genre);
      expect(response.body._id).not.toEqual("");
      expect(response.status).toBe(201);
    });
    it("should throw an error if a game cannot be saved", async () => {
      const actual = { title: "California Games" };
      const expected = "Error saving data to the DB";

      const response = await request(server)
        .post("/api/games")
        .send(actual);

      expect(response.body).toHaveProperty("error");
      expect(response.status).toBe(500);
    });
  });
  describe("GET method", () => {
    it("should return a list of games", async () => {
      const firstGame = {
        title: "California Games",
        genre: "Sports",
        releaseDate: "June 1987"
      };
      const secondGame = {
        title: "Kitten Tumble",
        genre: "Simulator",
        releaseDate: "June 2018"
      };
      const thirdGame = {
        title: "DoTheseAddBackward",
        genre: "Testing",
        releaseDate: "June 2018"
      };

      const response = await request(server).get("/api/games");

      expect(response.body[0].title).toEqual(firstGame.title);
      expect(response.body[1].title).toEqual(secondGame.title);
      expect(response.body[2].title).toEqual(thirdGame.title);
    });
    it("should return a status of 200", async () => {
      const response = await request(server).get('/api/games')

      expect(response.status).toEqual(200)
    })
  });
  describe("DELETE method", () => {
    it("should delete a game", async () => {
      const response = await request(server).delete(`/api/games/${gameId}`);

      expect(response.status).toEqual(204);
    });
    it("should throw a 404 error if no game is found", async () => {
      const firstTake = await request(server).delete(`/api/games/${gameId}`);
      const response = await request(server).delete(`/api/games/${gameId}`);

      expect(response.status).toEqual(404);
    });
  });
  describe('PUT method', () => {
    it('should update a game if a title and ID are provided and return the updated game', async () => {
    const actual = { title: "Meowsker Rises Again", genre: "Horror" }
      const response = await request(server).put(`/api/games/${gameId}`).send(actual)

      expect(response.status).toEqual(200)
      expect(response.body.title).toEqual(actual.title)
      expect(response.body.genre).toEqual(actual.genre)

      const databaseResponse = await Game.findOne(response.body.id)

      expect(databaseResponse.title).toBe(actual.title)
    })
    it('should not update if no title is provided', async () => {
      const actual = { genre: "Cats" }
      const response = await request(server).put(`/api/games/${gameId}`)

      expect(response.status).toEqual(422)
    })
    it('should not update if incorrect id provided', async () => {
      const actual = { title: "Feynman's Six Easy Pieces", genre: "Science" }

      const response = await request(server).put(`/api/games/5aa995c2b97194b732c16803`).send(actual)

      expect(response.status).toEqual(404)
    })
    it('should give a 500 status code if no valid ID is found in the parameter', async () => {
      const actual = { title: "Paradise Found", genre: "Historical Mockumentary" }

      const response = await request(server).put(`/api/games/wabble`).send(actual)

      expect(response.status).toEqual(500)
    })
  })
});
