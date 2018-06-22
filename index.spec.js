const mongoose = require("mongoose");
const request = require("supertest");
const Game = require("./games/Game");
const getGameTitle = require('./games/Game')
const server = require('./api/server')


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

  const newGame = {
    title: 'Zelda',
    genre: 'RPG',
    releaseDate: 'Sept 1988'
  };
  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    await Game.create({
      title: "California Games",
      genre: "Sports",
      releaseDate: "June 1987"
    });

});

  afterEach(async () => {
    //   // clear the games collection.
    await Game.remove({});
  });

  it("posts new game correctly", async () => {
    // test the POST here
    const response = await request(server)
      .post("/api/games")
      .send(newGame)
      .set('Accept', 'application/json');
      // const { status, type, body } = response;
      // const { game } = body; 
    // const gameTitle = "title" in game;
    // const gameID = "_id" in game;
    expect(response.status).toEqual(201);
    expect(response.body.title).toEqual("Zelda")
    expect(response.body.genre).toEqual("RPG")
    
  });
  
  // test the GET here
  it('gets a list of games from DB', async () => {
  
    const response = await request(server)
    .get('/api/games')
    .set('Accept', "application/json")

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body[0].title).toEqual("California Games")
    
  })



  // Test the DELETE here
it('deletes a specific game', async () => {

  const response = await request(server)
  .get('/api/games/' + ._id)
  .set("Accept", "application/json")
  
  expect(response).toEqual(200)
})

});
