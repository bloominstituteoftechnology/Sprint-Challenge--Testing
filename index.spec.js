const server = require('./api/server');
const request = require('supertest');

// Test for Test Endpoint
describe('GET /testme/ Test Endpoint', () => {
  beforeAll(async () => {
    return (response = await request(server).get('/testme/'));
  });
  it('Should respond with JSON', () => {
    expect(response.type).toBe('application/json');
  });
  it('Should respond with a status code of 200 (OK)', () => {
    expect(response.status).toBe(200);
  });
  it('Should respond with One More Time', () => {
    expect(response.body).toBe('One More Time');
  });
});
