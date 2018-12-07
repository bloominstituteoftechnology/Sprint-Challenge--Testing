const request = require('supertest');
const server = require('./api/server.js');

describe('GET endpoint /games', () => {
  it('returns a 200 status', async () => {
    const response = await request(server).get('/games');
    expect(response.status).toBe(200);
  });
  it('checks for an array (empty or otherwise)', async () => {
    const response = await request(server).get('/games');
    expect(response.body).toEqual(expect.arrayContaining([]));
  });
  it('returns the array of games', async () => {
    const array = [
      {
        title: 'Pac-man',
        genre: 'Arcade',
        releaseYear: 1980
      }
    ];
    const response = await request(server).get('/games');
    expect(response.body).toEqual(array);
  });
});

describe('POST endpoint /games', () => {
  it('returns a 201 status', async () => {
    const newGame = {
      title: 'Final Fantasy 3',
      genre: 'JRPG',
      releaseYear: 1994
    };
    const response = await request(server)
      .post('/games')
      .type('JSON')
      .send(newGame);
    expect(response.status).toBe(201);
  });
  it('returns a 422 status if missing required information', async () => {
    const newGame = { title: null, genre: null, releaseYear: 2001 };
    const response = await request(server)
      .post('/games')
      .type('JSON')
      .send(newGame);
    expect(response.status).toBe(422);
  });
  it('', async () => {});
});
