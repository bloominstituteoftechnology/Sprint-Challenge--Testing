const request = require('supertest');

const server = require('./server.js');
const db = require('../data/dbConfig');

describe('the route handlers', () => {

  describe('GET /games', () => {

    afterEach(async () => {
      await db('games').truncate();
    });

    it('responds with 200', async () => {
      const response = await request(server).get('/games');

      expect(response.status).toBe(200);
    })

    it('sends correct response object', async () => {
      const response = await request(server).get('/games');

      expect(response.body).toEqual([]);
    })

  })

  describe('POST /games', () => {

    afterEach(async () => {
      await db('games').truncate();
    });

    it('responds with 201 when body is correct', async () => {
      const body = { title: 'Windjammers', genre: 'Arcade' };
      const response = await request(server).post('/games').send(body);
  
      expect(response.status).toBe(201);
    })
  
    it('responds with 422, when body is missing data', async () => {
      const body = {};
      const response = await request(server).post('/games').send(body);

      expect(response.status).toBe(422);
    })

  })

})