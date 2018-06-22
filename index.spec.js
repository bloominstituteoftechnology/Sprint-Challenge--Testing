const request = require('supertest');
const mongoose = require('mongoose');
const server = require('./api/server');
const Game = require('./games/Game');

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
  let game = {};
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    game = {
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    };
    Game.create(game);
    return;
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here
  it('Returns a JSON object of the game and a Created status code of 201', async () => {
    const expectedStatusCode = 201;
    const expectedNewGame = {
      title: 'Uncharted',
      genre: 'Adventure',
      releaseDate: 'Nov 2007'
    };

    const newGame = await request(server).post('/api/games').send(expectedNewGame);

    expect(newGame.body.title).toBe(expectedNewGame.title);
    expect(newGame.body.genre).toBe(expectedNewGame.genre);
    expect(newGame.body.releaseDate).toBe(expectedNewGame.releaseDate);
    expect(newGame.status).toBe(expectedStatusCode);
  })

  it('Returns an error when provided an incomplete object', async () => {
    const expectedStatusCode = 500;
    const expectedErrorMessage = 'Error saving data to the DB';
    const expectedNewGame = {
      genre: 'Adventure',
      releaseDate: 'Nov 2007'
    };

    const newGame = await request(server).post('/api/games').send(expectedNewGame);

    expect(newGame.body.message).toBe(expectedErrorMessage);
    expect(newGame.status).toBe(expectedStatusCode);
  })


  // test the GET here
  it('Returns a JSON object of the existing game and an OK status code of 200', async () => {
    const expectedStatusCode = 200;

    const gameArray = await request(server).get('/api/games');

    expect(gameArray.body[0].title).toBe(game.title);
    expect(gameArray.body[0].genre).toBe(game.genre);
    expect(gameArray.body[0].releaseDate).toBe(game.releaseDate);
    expect(gameArray.status).toBe(expectedStatusCode);
  })

  it('Returns an error when endpoint is incorrect', async () => {
    const expectedStatusCode = 404;

    const gameArray = await request(server).get('/api/semag');

    expect(gameArray.status).toBe(expectedStatusCode);
  })


  // Test the DELETE here
  it('Returns an empty JSON object and a No Content status code of 204', async () => {
    const expectedStatusCode = 204;

    const existingGame = await request(server).get('/api/games');
    const existingGameId = existingGame.body[0]._id;
    const deletedGame = await request(server).delete(`/api/games/${existingGameId}`);

    expect(deletedGame.body).toEqual({});
    expect(deletedGame.status).toEqual(expectedStatusCode);
  })

  it('Returns an error message if the id is not found', async () => {
    const expectedStatusCode = 404;
    const expectedErrorMessage = 'Game not found';
    const existingGameId = 'thisaintreal';
    const deletedGame = await request(server).delete(`/api/games/${existingGameId}`);

    expect(deletedGame.body.message).toBe(expectedErrorMessage);
    expect(deletedGame.status).toBe(expectedStatusCode);
  })
});