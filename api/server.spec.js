const mongoose = require('mongoose');
const server = require('./server');
const Game = require('./games/Game');
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


  

  // test the GET here

  // Test the DELETE here
});
