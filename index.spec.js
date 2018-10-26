const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {
  describe('GET /', () => {
    
    it('should return status code 200(OK) when successful', async () => {
      const response = await request(server).get('/');
  
      expect(response.status).toBe(200);
    });

    it('should return JSON', async () => {
      const response = await request(server).get('/');
      expect(response.type).toBe('application/json');
    });

    it('should return { message: "Server check" }', async  () => {
      const response = await request(server).get('/');

      expect(response.body).toEqual({ message: 'Server check' });
    })
  });
  
  describe('GET /games', () => {
    it('returns the list of games', async () => {
      //response is list of games
    });

    it('returns status code 200 if successful', async () => {
      //status code is 200
    });

    it('always returns an array', () => {
      //response is always an array
    });
  })

  describe('POST /games', async () => {
    it('returns status code 422 if missing required fields', async () => {
      const response = await request(server)
        .post('/games')
        .send({ title: 'Skyrim', releaseYear: 2011 });

        expect(response.status).toBe(422);
    });

    it('returns status code 201 when required fields are complete', async () => {
      
      const response = await request(server)
        .post('/games')
        .send({ title: 'Pokemon Yellow', genre: 'RPG' })

        expect(response.status).toBe(201);
    })
  })
});