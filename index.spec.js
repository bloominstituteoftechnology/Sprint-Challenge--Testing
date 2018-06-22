const mongoose = require('mongoose');
const request = require('supertest');
const Game = require('./games/Game');
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

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    console.log('before each ran');
    return Game.create({ title: "test-game", genre: "test-genre", releaseDate: "test-date" });
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove({});    
  });

  it('runs the tests', () => {});

  // test the POST here
  it('should return 201 and JSON object with game title when posting to api/games', async () => {
    const expectedStatusCode = 201;
    const body = { title: "some game", genre: "some genre", releaseDate: "some date" }
    const response = await request(server).post('/api/games').send(body);

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body).toMatchObject({ title: "some game" });
    expect(response.type).toEqual('application/json');
  });

  it('should return 500 and JSON object with error message when posting to api/games w/o body', async () => {
    const expectedStatusCode = 500;
    const response = await request(server).post('/api/games').send();

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body).toMatchObject({ message: 'Error saving data to the DB' });
    expect(response.type).toEqual('application/json');
  });



  // test the GET here
  it('should return OK status code and a JSON object w/ games from get /api/games', async () => {
    const expectedStatusCode = 200;
    const expectedBody = { title: "test-game", genre: "test-genre", releaseDate: "test-date" };

    const response = await request(server).get('/api/games');

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body[0]).toMatchObject(expectedBody);
    expect(response.type).toEqual('application/json');
  });

  it('should return 404 status code when sending bad request param to GET /api/games', async () => {
    const expectedStatusCode = 404;
    const expectedBody = undefined;

    const response = await request(server).get('/api/games/bullshit');
    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body[0]).toEqual(expectedBody);
    expect(response.type).toEqual('text/html');
  });


  // Test the DELETE here
});
