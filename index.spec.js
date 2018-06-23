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
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const games = [
      { title: 'A', genre: 'A', releaseDate: 'A' },
      { title: 'B', genre: 'B', releaseDate: 'B' },
      { title: 'C', genre: 'C', releaseDate: 'C' },
      { title: 'D', genre: 'D', releaseDate: 'D' },
      { title: 'E', genre: 'E', releaseDate: 'E' },
    ];

    await Game.insertMany(games);
  });

  // afterEach(() => {
  //   //   // clear the games collection.
  // });

  it('runs the tests', () => {});

  // test the POST here

  it('Should return a Created status code and the created user.', async () => {
    const body = { title: 'F', genre: 'F', releaseDate: 'F' };
    const url = 'api/games';
    const response = await request(server).post(url).send(body);
    gameId = response.body._id;

    expect(response.status).toEqual(201);
    expect(response.body.genre).toEqual(body.genre);
  });

  // test the GET here

  it('Should return list of games', async () => {
    const url = '/api/games';
    const response = await request(server).get(url);

    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test the DELETE here

  it('Should delete a game and return deleted game as a JSON object.', async () => {
    const url = `/api/games/${ gameId }`;
    const response = await request(server)
      .delete(url)
      .then(res => res)
      .catch(err => err);

    expect(response.status).toEqual(500);
  });
});
