const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  describe('GET /games', () => {
    it('should return a status code of 200', () => {
      const response = request(server).get('/games');
      expect(response.status).toBe(200);
    });
    it('should always return an array', () => {
      const response = request(server).get('/games');
      expect(typeof response.body).toBe('array');
    });
    it('should return a list of games', () => {
      const response = request(server).get('/games');
      const expected = [
        { id: 1, title: 'Pokemon', genre: 'Adventure', releaseYear: 2000 },
        { id: 2, title: 'League of Legends', genre: 'MOBA', releaseYear: 2007 }
      ];
      expect(response.body).toEqual(expected);
    });
  });
  describe('POST /games', () => {
    it('should return a status code of 422 if not enough information', () => {
      const response = request(server)
        .post('/games')
        .send({
          title: 'abcd'
        });
      expect(response.status).toBe(422);
    });
    it('should return games if succesfully added', () => {
      const response = request(server)
        .post('/games')
        .send({
          title: 'FortNite',
          genre: 'BR',
          releaseYear: 2017
        });
      const expected = [
        { id: 1, title: 'Pokemon', genre: 'Adventure', releaseYear: 2000 },
        { id: 2, title: 'League of Legends', genre: 'MOBA', releaseYear: 2007 },
        { id: 3, title: 'FortNite', genre: 'BR', releaseYear: 2017 }
      ];
      expect(response.body).toEqual(expected);
    });
    it('should return a status code of 201 if successful', () => {
      const response = request(server)
        .post('/games')
        .send({
          title: 'DELETE',
          genre: 'USELESS'
        });
      expect(response.status).toBe(201);
    });
  });
});
