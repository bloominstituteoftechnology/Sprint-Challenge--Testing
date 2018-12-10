const request = require('supertest');
const { isAnArray } = require('@coetry/simpletypes');

const server = require('../api/server.js');

describe('videogamesRoutes.js', () => {
  describe('/api route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/api');

      expect(response.status).toBe(200);
    });

    it('should return JSON', async () => {
      let response = await request(server).get('/api');

      expect(response.type).toBe('text/html');
    });

    it('should return with a body like: { api: "up" }', async () => {
      let response = await request(server).get('/api');

      expect(response.text).toEqual('Server Listens and Obeys');
    });
  });

  describe('GET /games route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/api/games');

      expect(response.status).toBe(200);
    });

    it('should return JSON', async () => {
      let response = await request(server).get('/api/games');

      expect(response.type).toBe('application/json');
    });

    it('should return with a list of games', async () => {
      let response = await request(server).get('/api/games');

      expect(isAnArray(response.body)).toBeTruthy();
    });
  });

  describe('POST /games endpoint', () => {
    it('should add a new game', async () => {
      let response = await request(server)
        .post('/api/games')
        .send({
          title: 'Sonic The Hedgehog 4',
          genre: 'Platformer',
          releaseYear: '1990'
        });

      expect(response.body).toEqual({
        title: 'Sonic The Hedgehog 4',
        id: 6,
        genre: 'Platformer',
        releaseYear: '1990'
      });
    });
    it('should return JSON', async () => {
      let response = await request(server).post('/api/games');

      expect(response.type).toBe('application/json');
    });

    it('Posting with no req.body should return an error', async () => {
      let response = await request(server).post('/api/games');

      expect(isAnArray(response.body)).toBeFalsy();
    });

    it('should not let you post a duplicate game title', async () => {
      let response = await request(server)
        .post('/api/games')
        .send({
          title: 'Sonic The Hedgehog 4',
          genre: 'Platformer',
          releaseYear: '1990'
        });

      expect(response.status).toBe(405);
    });
  });
});
