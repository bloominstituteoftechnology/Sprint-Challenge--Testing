const mongoose = require('mongoose');
const server = require('./server');
const Game = require("../games/Game");
const request = require('supertest');


describe('The API Server', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  let gameId2;
  let gameId3;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(async () => {
    const nba2K = await Game.create({
      title: 'NBA 2K17',
      genre: 'Sports',
      releaseDate: 'September 2016',
    });
    gameId = nba2K._id;

    const fifa = await Game.create({
      title: "FIFA 18",
      genre: 'Sports',
      releaseDate: 'September 2017',
    });
    gameId2 = fifa._id;

    const madden = await Game.create({
      title: 'Madden 18',
      genre: 'Sports',
      releaseDate: 'August 2017'
    });
    gameId3 = madden._id;

    return Game.find();
  });

  afterEach(() => {
    return Game.remove();
  });

//POST tests
  describe("POST method", () => {
    it("should create a new game and return it", async () => {
      const actual = { title: "Final Fantasy X", genre: 'RPG' };
      const expected = { title: "Final Fantasy X", genre: 'RPG' };
      const response = await request(server)
        .post("/api/games")
        .send(actual);

        expect(response.body.title).toEqual(expected.title);
        expect(response.body.genre).toEqual(expected.genre);
        expect(response.body._id).not.toEqual("");
        expect(response.status).toBe(201);
    });

    it("Throws and error if the game cannot be created and saved to the DB", async () => {
      const actual = { title: "NBA 2K17"};
      const expected = "This game cannot be saved to the database";

      const response = await request(server)
        .post("/api/games")
        .send(actual);

        expect(response.body).toHaveProperty("error");
        expect(response.status).toBe(500);
    });
  });

//GET Tests
describe("GET method", () => {
  it("Returns a list of saved games", async () => {
    const nba2K = {
      title: 'NBA 2K17',
      genre: 'Sports',
      releaseDate: 'September 2016',
    };

    const fifa = {
      title: "FIFA 18",
      genre: 'Sports',
      releaseDate: 'September 2017',
    };

    const madden = {
      title: 'Madden 18',
      genre: 'Sports',
      releaseDate: 'August 2017'
    };

    const response = await request(server).get("/api/games");

    expect(response.body[0].title).toEqual(nba2K.title);
    expect(response.body[1].title).toEqual(fifa.title);
    expect(response.body[2].title).toEqual(madden.title);
  });

  it("Returns a status code of 200", async () => {
    const response = await request(server).get('/api/games')

    expect(response.status).toEqual(200)
  })
});

//DELETE tests
describe('DELETE Method', () => {
  it("Game should be deleted from the database", async () => {
    const response = await request(server).delete(`/api/games/${gameId}`);

    expect(response.status).toEqual(204);
  });

  it("Returns a 404 Error if the game does not exist in the database", async () => {
    const doesItExist = await request(server).delete(`/api/games/${gameId}`);
    const response = await request(server).delete(`/api/games/${gameId}`);

    expect(response.status).toEqual(404);
  });
});

//Stretch Goals:
describe('PUT method', () => {
  it("Updates a game and returns it", async () => {
    const actual = { title: "Kingdom Hearts", genre: "RPG"};
      const response = await request(server).put(`/api/games/${gameId}`).send(actual)

    expect(response.status).toEqual(200)
    expect(response.body.title).toEqual(actual.title)
    expect(response.body.genre).toEqual(actual.genre)

    const dBResponse = await Game.findOne(response.body.id)

    expect(dBResponse.title).toBe(actual.title)

  })

  it("Will not update without a title", async () => {
    const actual = { genre: "Simulation" }
      const response = await request(server).put(`/api/games/${gameId}`)

    expect (response.status).toEqual(422)
  })
});

});
