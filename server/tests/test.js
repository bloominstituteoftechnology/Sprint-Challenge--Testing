const request = require('supertest');

const server = require('../index.js');

describe('get /games', () => {
  it('should return an array of game objects', async () => {
    const response = await request(server).get('/games');

    expect(typeof response.body).toEqual('object');
  });

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
  });
})

describe('post /games', () => {
  it('should respond with code 423 if req paras not included', async () => {
    const response = await request(server)
      .post('/games')
      .send({
        "title": "Garry's Mod",
        "genred": "Sandbox",
        "year": "2002",
      })
    expect(response.status).toEqual(422);
    // expect(Object.keys(response.body).length).toBeGreaterThan(1);
    // expect(Object.keys(response.body).length).toBeLessThan(4);
    // expect(response.body).toEqual(4)
  });
  it('should respond with code 200 if req paras included', async () => {
    const response = await request(server)
      .post('/games')
      .send({
        "title": "Garry's Mod",
        "genre": "Sandbox",
        "year": "2002",
      })
    expect(response.status).toEqual(200);
  });
})
