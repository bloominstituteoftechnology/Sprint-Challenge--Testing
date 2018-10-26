const server = require('./api/server.js');
const request = require('supertest');

describe('SERVER', () => {
  it('should run tests', () => {
    expect(true).toBeTruthy();
  });

  describe('GET /games', () => {
    it('should return statusCode = 404 when games list is empty', async () => {
      const response = await request(server).get('/games');

      expect(response.status).toBe(404);
    });

    it('should return the games array even if it is empty', async () => {
      const response = await request(server).get('/games');

      expect(response.body).toEqual([]);
    });

    it('should return JSON', async () => {
      const response = await request(server).get('/games');

      expect(response.type).toBe('application/json');
    });

    // it('should return statusCode = 200 when games list is not empty', async () => {
    //   const response = await request(server).get('/games');

    //   expect(response.status).toBe(200);
    // });
  });

  describe('POST /games', () => {
    
  });
});