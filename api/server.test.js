const request = require('supertest');
const server = require('./server');

describe('GET /games tests', () => {
  it('should return status 200', async () => {
    const res = await request(server).get('/games');
    expect(res.status).toBe(200);
  });
  it('should return an array', async () => {
    const res = await request(server).get('/games');
    expect(Array.isArray(res.body)).toBe(true);
  });
  it('should return an array if empty', async () => {
    const res = await request(server).get('/games');
    expect(res.body).toEqual([]);
  });
});
