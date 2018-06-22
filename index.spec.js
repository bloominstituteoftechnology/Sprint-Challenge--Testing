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

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    populateGame = {
      title: 'World of Warcraft',
      genre: 'MMORPG',
      releaseDate: 'Nov. 23, 2004'
    };
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove();
  });

  it('runs the tests', () => { });

  // test the POST here
  it('POST api/games', () => {

  })

  // test the GET here
  it('GET api/games, GET successful', async () => {
    const response = await request(server).get('api/games');
    const expectedStatusCode = 200;

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.type).toEqual('application/json');
  })

  it('GET api/games, GET not successful', async () => {
    const response = await request(server).get('api/games');
    console.log(response.body);

    // expect(response.body[0]).toEqual();
  })

  // Test the DELETE here
  it('DELETE api/games/:id', async () => {
    const expectedStatusCode = 204;
    const response = await request(server).delete(`/api/games/${gameId}`);

    expect(response.status).toEqual(expectedStatusCode);
    expect(response.type).toEqual('application/json');
  })

});
