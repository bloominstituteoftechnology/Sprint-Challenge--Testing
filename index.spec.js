const request = require('supertest'); 
const mongoose = require('mongoose');
const server = require('./api/server')
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
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here
  it('should return a Created status code and the created user', async () => {
    const expectedStatusCode = 201; 
    const expectedBody = {
      title: 'California Games',
      genre: 'Sports', 
      releaseDate: 'June 1987'
    };

    const newGame = await request(server).post('/api/games').send(expectedBody);

    expect(newGame.body.title).toEqual('California Games');
    expect(newGame.body.genre).toEqual('Sports');
    expect(newGame.body.releaseDate).toEqual('June 1987');
  });

  // test the GET here
  it('should return an OK status and return a list of the games', async () => {
    const expectedStatusCode = 200;
    const expectedBody = {};

    const response = await request(server).get('/');

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.body).toEqual(expectedBody);
    // expect(response.data[0].title).toEqual(games.title); 
  });

  // Test the DELETE here
  it('should return a No Content status and the deleted user', async () => {
    const expectedStatusCode = 204; 
    const expectedBody = {
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    };

    const newGame = await request(server).post('/api/games').send(expectedBody);
    const deleteGame = await request(server).delete(`/api/games/${newGame.body_id}`);
    
    expect(deleteGame.body.title).toEqual('California Games');
    expect(deleteGame.body.genre).toEqual('Sports'); 
    expect(deleteGame.body.releaseDate).toEqual('June 1987'); 
  })

});
