const request = require('supertest');
const server = require('./api/server.js');

describe('GET endpoint /games', () => {
  it('returns a 200 status', async () => {
    const response = await request(server).get('/games');
    expect(response.status).toBe(200);
  });
  it('', async () => {});
  it('', async () => {});
});

describe('POST endpoint /games', () => {
  it('', async () => {});
  it('', async () => {});
  it('', async () => {});
});
