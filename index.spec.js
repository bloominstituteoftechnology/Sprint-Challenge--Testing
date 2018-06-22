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
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const game = {
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    };
    return Game.create(game);
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

    expect(newGame.body.title).toBe('Uncharted');
    expect(newGame.body.genre).toBe('Adventure');
    expect(newGame.body.releaseDate).toBe('Nov 2007');
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

    expect(newGame.text).toContain(expectedErrorMessage);
    expect(newGame.status).toBe(expectedStatusCode);
  })


  // test the GET here
  it('Returns a JSON object of the existing games and an OK status code of 200', async () => {
    const expectedStatusCode = 201;
    const expectedNewGame = {
      title: 'Uncharted',
      genre: 'Adventure',
      releaseDate: 'Nov 2007'
    };

    const newGame = await request(server).post('/api/games').send(expectedNewGame);

    expect(newGame.body.title).toBe('Uncharted');
    expect(newGame.body.genre).toBe('Adventure');
    expect(newGame.body.releaseDate).toBe('Nov 2007');
    expect(newGame.status).toBe(expectedStatusCode);
  })

  // Test the DELETE here
});
