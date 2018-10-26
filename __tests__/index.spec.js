const server = require('../server.js');
const request = require('supertest');

describe('test suites for basic API operations', () => {

  describe('GET tests', () => {

    test('should return games list as an array', async () => {
      const response = await request(server).get('/');
      expect(Array.isArray(response.body)).toBe(true);
    });

    test('status code returned should be 200', async () => {
      const response = await request(server).get('/games');
      expect(response.status).toBe(200);
    });

    test('game list length should be 5', async () => {
      const response = await request(server).get('/games');
      expect(response.body.length).toBe(5);
    });

  }); // GET

  describe('POST tests', () => {

    test('status code returned should be 422 if data format is not correct', async () => {
      const game = {"game": "Dota 2"};
      const response = await request(server).post('/games').send(game);
      expect(response.status).toBe(422);
    });
    
  })
});
