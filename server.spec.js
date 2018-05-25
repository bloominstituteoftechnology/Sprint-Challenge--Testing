const mongoose = require('mongoose');

const request = require('supertest');
const server = require('./server');
const Game = require('./games/Game');

/**
 * @param beforeAll() creates the test database before any testing is initialized
 */
describe('Games', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='));
  });

  /**
   * @param afterAll() disconnects the database
   */
  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId, game;
  // // hint - these wont be constants because you'll need to override them.

  /**
   * @param beforeEach() creates mock data before each test
   * @param newGame creates a new Game object for tests
   * @param gameID creates new ID seen using console.log on line 37
   */
  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    game = {
      title: 'jest testing',
      genre: 'Educational',
      releaseDate: 'December 1994'
    };

    const newGame = await Game.create(game);
    gameId = newGame._id;
    // console.log(gameId);
  });

  /**
   * @param afterEach() resets database values after each test by removing games
   */
  afterEach(() => {
    //   // clear collection.
    return Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here
  it('should post a new game', async () => {
    const response = await request(server)
      .post('/api/games')
      .send(game);
    const expectedTitle = 'jest testing';

    expect(response.status).toEqual(201);
    expect(response.type).toEqual('application/json');
    expect(response.body.title).toEqual(expectedTitle);
  });

  // test the GET here
  it('should get a list of the existing games', async () => {
    const response = await request(server).get('/api/games');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body[0].title).toBe('jest testing');
  });

  // Test the DELETE here
});
