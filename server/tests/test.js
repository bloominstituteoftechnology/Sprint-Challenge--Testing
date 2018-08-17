const request = require('supertest');

const server = require('../index.js');

describe('get /games', () => {
  it('should return an array of game objects', async () => {
    const response = await request(server).get('/games');

    expect(typeof response.body).toEqual('object');
  })

  it ('should match actual data', async () => {
    const response = await request(server).get('/games');

    expect(response.body).toEqual( [
      {
        "title": "Pokemon",
        "genre": "Adventure",
        "year": "1994"
      },
      {
        "title": "Yu-gi-oh",
        "genre": "Card",
        "year": "1994"
      }
    ]);
  })
})
