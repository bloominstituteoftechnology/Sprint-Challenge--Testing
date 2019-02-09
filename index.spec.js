const request = require('supertest');
const server = require('./api/server');
const knex = require('./dbConfig');

describe('server.js', () => {
  describe('/games endpoint POST', () => {
    it('should return status 422 when missing genre', async () => {
      const game = {
        title: 'FIFA-19',
        releasedYear: 2019
      };
      const response = await request(server)
        .post('/games')
        .send(game);
      expect(response.status).toBe(422);
    });
    it('should return status 422 when missing title', async () => {
      const game = {
        genre: 'Sports'
      };
      const response = await request(server)
        .post('/games')
        .send(game);
      expect(response.status).toBe(422);
    });
    it('it should return status code 201', async () => {
      const game = {
        title: 'FIFA-19',
        genre: 'Sports',
        releasedYear: 2019
      };
      const response = await request(server)
        .post('/games')
        .send(game);
      expect(response.status).toBe(201);
    });
  });
  describe('/games endpoint GET', () => {
    it('should return array with games and status 200', async () => {
      const game = {
        title: 'FIFA-18',
        genre: 'Sports',
        releasedYear: 2018
      };
      const game1 = {
        title: 'FIFA-17',
        genre: 'Sports',
        releasedYear: 2017
      };
      await request(server)
        .post('/games')
        .send(game);
      await request(server)
        .post('/games')
        .send(game1);
      const expected = [
        { id: 1, title: 'FIFA-18', genre: 'Sports', releasedYear: 2018 },
        { id: 2, title: 'FIFA-17', genre: 'Sports', releasedYear: 2017 }
      ];
      const response = await request(server).get('/games');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body).toEqual(expected);
    });
  });
});
