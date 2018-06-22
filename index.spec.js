const mongoose = require('mongoose');
const config = require('./config.js');
const request = require('supertest');
const { dbuser, dbpassword } = config.secret
const Game = require('./games/Game');
const server = require('./api/server.js');

describe('The API Server', () => {
  let game1;
  beforeAll(() => {
    return mongoose
      .connect(`mongodb://${dbuser}:${encodeURIComponent(dbpassword)}@ds016718.mlab.com:16718/test`)
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
    game1 = { title: 'HearthStone', type: 'card' }
  });

  afterEach(() => {
    //   // clear the games collection.
    return Game.remove();
  });
  // test the POST here
  it('POST a game', async() => {
    const newGame = game1
    const response = await request(server)
      .post('/api/games')
      .send(newGame)

    expect(response.status).toEqual(201)
    expect(response.data).toEqual(newGame)
  });

  // test the GET here
  it('GET all games', async() => {
    const response = await request(server).get('/api/games')
    const gameList = [
      ...game1
    ]
    expect(response.status).toEqual(200)
    expect(response.data).toEqual(gameList)
  });

  // Test the DELETE here
  it('DELETE a game', async() => {
    const invalidGameId = 'nonExistedId'
    const validGameId = 'existedId'

    const invalidResponse = await request(server).delete(`/api/games/${invalidGameId}`)
    const validResponse = await request(server).delete(`/api/games/${validGameId}`)
    const withoutIdResponse = await request(server).delete(`/api/games/`)

    expect(invalidResponse.status).toEqual(404)
    expect(invalidResponse.message).toEqual('Game not found')
    expect(validResponse.status).toEqual(204)
    expect(withoutIdResponse.status).toEqual(422)
    expect(withoutIdResponse.message).toEqual('You need to give me an ID')
  });
});
