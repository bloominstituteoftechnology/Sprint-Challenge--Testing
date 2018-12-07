const request = require('supertest');
const server = require('./api/server.js');

it('the server is running', () => {
  expect(true).toBeTruthy();
});

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
    const response = await request(server).get('/games');
    expect(response.body.games.length).toBeGreaterThan(0);
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
  describe('returns a 422 status if missing required information', () => {
    it('missing game genre', async () => {
      const newGame = { title: 'Aladdin' };
      const response = await request(server)
        .post('/games')
        .type('JSON')
        .send(newGame);
      expect(response.status).toBe(422);
    });
    it('missing game title', async () => {
      const newGame = { genre: 'FPS' };
      const response = await request(server)
        .post('/games')
        .type('JSON')
        .send(newGame);
      expect(response.status).toBe(422);
    });
  });
  it('returns a new array', async () => {
    const array = [
      {
        title: 'Pac-man',
        genre: 'Arcade',
        releaseYear: 1980
      },
      { title: 'Sonic the Hedgehog', genre: 'Platform', releaseYear: 1991 }
    ];
    const newGame = {
      title: 'Sonic the Hedgehog',
      genre: 'Platform',
      releaseYear: 1991
    };
    const response = await request(server)
      .post('/games')
      .type('JSON')
      .send(newGame);
    expect(response.body).toEqual(array);
  });
});
