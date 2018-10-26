const request = require('supertest');
const server = require('./api/server');

describe('server', () => {

  describe('GET /games', () => {
    it('should return status code 200', async () => {
      const response = await request(server).get('/games');
      expect(response.status).toBe(200);
    }); // 200

    it('should return JSON', async () => {
      const response = await request(server).get('/games');
      expect(response.type).toBe('application/json');
    }); // json

    it('should return a game title', async () => {
      const expected = 'Pacman';
      const response = await request(server).get('/games');
      expect(response.body.title).toEqual(expected);
    });

  }); // get

  describe('POST /games', () => {

  }); // post


}); // server