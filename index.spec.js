const mongoose = require('mongoose');

const Game = require('./games/Game');

const request = require('supertest');
const server = require('./api/server');

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
    const expectedBody = {
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    }
    const game = await Game.create(expectedBody)
  });

  afterEach( async () => {
    //   // clear the games collection.
      await Game.remove();
  });

  it('runs the tests and returns an OK status code and a JSON object from the index route', async () => {
    const expectedStatusCode = 200;
    const expectedBody = { api: 'running!' };

    const response = await request(server).get('/');

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body).toEqual(expectedBody);
    expect(response.type).toEqual('application/json');
  });


  // test the POST here
  it('returns a 201 status code and a JSON object from the /api/games route', async () => {
    const expectedBody = {
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    }

    const response = await request(server).post('/api/games').send(expectedBody)

    expect(response.status).toEqual(201);
    expect(response.type).toEqual("application/json");
    expect(response.body.title).toEqual(expectedBody.title);
    expect(response.body.genre).toEqual(expectedBody.genre);
    expect(response.body.releaseDate).toEqual(expectedBody.releaseDate);
  })

  })

  // test the GET here

  // Test the DELETE here

