const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
  describe('GET /api/games', async () => {
    it('should return status code 200 OK', async () => {
      const expected = 200;

      const response = await request(server).get('/api/games');

      expect(response.status).toEqual(expected);
    });

    it('should return a list of games', async () => {
      const expected = server.games;

      const res = await request(server).get('/api/games')

      expect(res.body).toEqual(expected);
    });

    it('should return an empty list if there are no games in the server', async () => {
      const expected = [];

      const res = await request(server).get('/api/games')

      expect(res.body).toEqual(expected);
    });
  })
})