const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  describe('GET /games', () => {
    it('should return a status code of 200', async () => {
      const response = await request(server).get('/games');
      expect(response.status).toBe(200);
    });
    it('should always return an array', async () => {
      const response = await request(server).get('/games');
      expect(Array.isArray(response.body)).toBeTruthy();
    });
    it('should return a list of games', async () => {
      const response = await request(server).get('/games');
      const expected = [
        { id: 1, title: 'Pokemon', genre: 'Adventure', releaseYear: 2000 },
        { id: 2, title: 'League of Legends', genre: 'MOBA', releaseYear: 2007 }
      ];
      expect(response.body).toEqual(expected);
    });
  });
  describe('POST /games', () => {
    it('should return a status code of 422 if not enough information', async () => {
      const response = await request(server)
        .post('/games')
        .send({
          title: 'abcd'
        });
      expect(response.status).toBe(422);
    });
    it('should return a status code of 405 if title already exists', async () => {
      const response = await request(server)
        .post('/games')
        .send({
          title: 'Pokemon',
          genre: 'Adventure'
        });
      expect(response.status).toBe(405);
    });
    it('should return games if succesfully added', async () => {
      const response = await request(server)
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
    it('should return a status code of 201 if successful', async () => {
      const response = await request(server)
        .post('/games')
        .send({
          title: 'DELETE',
          genre: 'USELESS'
        });
      expect(response.status).toBe(201);
    });
  });
  describe('GET /games/:id', () => {
    it('should return a status code of 200 if game exists', async () => {
      const response = await request(server).get('/games/1');
      expect(response.status).toBe(200);
    });
    it('should return a list of found game', async () => {
      const response = await request(server).get('/games/1');
      const expected = [
        { id: 1, title: 'Pokemon', genre: 'Adventure', releaseYear: 2000 }
      ];
      expect(response.body).toEqual(expected);
    });
    it('should return a status code of 404 if game is not found', async () => {
      const response = await request(server).get('/games/100');
      expect(response.status).toBe(404);
    });
  });
  describe('DELETE /games/:id', () => {
    it('should return a status code of 200 if game exists', async () => {
      const response = await request(server).delete('/games/4');
      expect(response.status).toBe(200);
    });
    it('GET /games should return list without deleted game', async () => {
      const response = await request(server).get('/games');
      const expected = [
        { id: 1, title: 'Pokemon', genre: 'Adventure', releaseYear: 2000 },
        { id: 2, title: 'League of Legends', genre: 'MOBA', releaseYear: 2007 },
        { id: 3, title: 'FortNite', genre: 'BR', releaseYear: 2017 }
      ];
      expect(response.body).toEqual(expected);
    });
    it('should return a status code of 404 if game is not found', async () => {
      const response = await request(server).delete('/games/100');
      expect(response.status).toBe(404);
    });
  });
});
