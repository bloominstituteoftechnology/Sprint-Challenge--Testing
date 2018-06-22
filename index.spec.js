const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./api/server');

const Game = require('./games/Game');

const testCase = {
  title: 'California Games',
  genre: 'Sports',
  releaseDate: 'June 1987'
}

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
    return Game.create(testCase);
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove(testCase);
  });

  it('should post a game to the database', async () => {
    const response = await request(server)
      .post('/api/games')
      .send(testCase)
    expect(response.status).toEqual(201);  
  });

  // test the POST here

  // test the GET here

  // Test the DELETE here
});
