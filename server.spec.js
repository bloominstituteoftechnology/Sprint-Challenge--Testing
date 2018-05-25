const mongoose = require('mongoose');

const Game = require('./games/Game');

describe('Games', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='));
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
  });

  afterEach(() => {
    //   // clear collection.
  });

  it('runs the tests', async () => {

  });

  // test the POST here
  it('should get ok msg and json object from /api/games', async () => {
    const response = await request(server).post('/api/games');
  
    expect(response.status).toEqual(201);
    expect(response.type).toEqual('application/json');
  });
  // test the GET here
it('should get ok msg and json object from /api/games', async () => {
  const response = await request(server).get('/api/games');

  expect(response.status).toEqual(200);
  expect(response.type).toEqual('application/json');
});
  // Test the DELETE here
  it('should get ok msg and json object from /api/games', async () => {
    const response = await request(server).get('/api/games/:id');
  
    expect(response.status).toEqual(204);
    expect(response.type).toEqual('application/json');
  });
});

it('should return Ok and a json object from the index route', async () => {
  const expectedBody = { api: 'running!' };
  const response = await request(server).get('/');
  expect(response.status).toEqual(200);
  expect(response.type).toEqual('application/json');
  expect(response.body).toEqual(expectedBody);
});