const mongoose = require('mongoose');
const request = require('supertest');

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

  beforeEach(async () => {
    const games = [
      { title: 'A', genre: 'A', releaseDate: 'A' },
      { title: 'B', genre: 'B', releaseDate: 'B' },
      { title: 'C', genre: 'C', releaseDate: 'C' },
      { title: 'D', genre: 'D', releaseDate: 'D' },
      { title: 'E', genre: 'E', releaseDate: 'E' }
    ];

    await Game.insertMany(games);
  });

  // afterEach(async () => {
    // await Game.remove({});
  // });

  it('runs the tests', () => {});

  // test the POST here
  it('should create a new game and return it as JSON', async () => {
    const body = { title: 'F', genre: 'F', releaseDate: 'F' };
    const url = '/api/games';
    const response = await request(server).post(url).send(body);
    gameId = response.body._id;

    expect(response.status).toEqual(201);
    expect(response.body.genre).toEqual(body.genre);
  })

  // test the GET here
  it('should return a list of games as an array of objects', async () => {
    const url = '/api/games';
    const response = await request(server).get(url);

    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test the DELETE here
  it('should delete a game by the ID and return the deleted game as JSON', async () => {
    const url = `/api/games/${ gameId }`;
    const response = await request(server)
      .delete(url)
      .then(res => res)
      .catch(err => err);

    expect(response.status).toEqual(204);
  })
});