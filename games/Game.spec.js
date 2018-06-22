const mongoose = require('mongoose');
const superTestRequest = require("supertest");
const server = require("../api/server");
const Game = require('./Game');

describe('The Game Model', () => {
  let game1;
  let game2;

  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  beforeEach(() => {
    game1 = {
      title : "First game",
      genre: 'Sports',
      releaseDate: 'June 1987'
    }
    
    game2 = {
      title : "Second game",
      genre: 'Arcade',
      releaseDate: 'May 1999'
    }
  })

  afterEach(() => {
    return Game.remove();
  })

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  it('runs the tests', () => {});

  // test away!
  it("should be able to create a game", async () => {
    let createdGame = await superTestRequest(server).post("/api/games").send(game1);
    expect(createdGame.status).toEqual(201);
    expect(createdGame.body.title).toEqual("First game");
  })

  it("should be able to get all the games", async () => {
    let createdGame1 = await superTestRequest(server).post("/api/games").send(game1).set('Accept', 'application/json');
    let createdGame2 = await superTestRequest(server).post("/api/games").send(game2).set('Accept', 'application/json');

    let allGames = await superTestRequest(server).get("/api/games").set('Accept', 'application/json')
    
    allGames = JSON.parse(allGames.text); // parse to json
    expect(allGames[0].title).toEqual("First game");
    expect(allGames[1].title).toEqual("Second game");
  })  

  it("should be able to delete a game", async () => {
    let createdGame1 = await superTestRequest(server).post("/api/games").send(game1).set('Accept', 'application/json');
    expect(createdGame1.body.title).toEqual("First game");
    createdGame = JSON.parse(createdGame1.text); // parse to json
    let id = createdGame._id;
    let deletedGame = await superTestRequest(server).delete(`/api/games/${id}`).set('Accept', 'application/json');
    expect(deletedGame.status).toEqual(204);
  })

  it("should send a status of 404 and a messege of 'Game not found' if wrong id", async() => {
    const expectedStatusCode = 404;
    const expectedErrorMessage = 'Game not found';
    const existingGameId = 'thisaintreal';
    const deletedGame = await superTestRequest(server).delete(`/api/games/${existingGameId}`);

    expect(deletedGame.body.message).toBe(expectedErrorMessage);
    expect(deletedGame.status).toBe(expectedStatusCode);
  })

});
