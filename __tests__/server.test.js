const request = require('supertest');
const server = require('../server.js'); 

describe('server.js', () => {
  
  describe('POST /games', () => {
 
    it('should return JSON', async () => {
      const expected = 'application/json';
      const response = await request(server)
      .post('/games')
      .send({});

      expect(response.type).toEqual(expected);
    });
    
    it(`should return status code 422 UNPROCESSABLE ENTITY when title is not provided`, async () => {
      const expected = 422;
      const response = await request(server)
      .post('/games')
      .send({ 
        title: '', 
        genre: 'Arcade',
        releaseYear: 1980
      });

      expect(response.status).toEqual(expected);
    });

    it(`should return status code 422 UNPROCESSABLE ENTITY when genre is not provided`, async () => {
      const expected = 422;
      const response = await request(server)
      .post('/games')
      .send({ 
        title: 'Pacman', 
        genre: '',
        releaseYear: 1980
      });

      expect(response.status).toEqual(expected);
    });

    it(`should return status code 201 Created when title and genre is provided`, async () => {
      const expected = 201;
      const response = await request(server)
      .post('/games')
      .send({ 
        title: 'Megaman', 
        genre: 'Arcade',
        releaseYear: 1980
      });

      expect(response.status).toEqual(expected);
    });

    it(`should return game object when title and genre are provided`, 
      async () => {
        const expected = { 
          title: 'Super Mario Odyssey', 
          genre: 'Arcade',
          releaseYear: 2017
        };
        const response = await request(server)
          .post('/games')
          .send({ 
            title: 'Super Mario Odyssey', 
            genre: 'Arcade',
            releaseYear: 2017
          });

        expect(response.body).toEqual(expected);
    });

    it(`should return 405 NOT ALLOWED when a duplicate title is sent`, async () => {
      const expected = 405;
      const response = await request(server)
      .post('/games')
      .send({ 
        title: 'Pacman', 
        genre: 'Arcade',
        releaseYear: 1980
      });

      expect(response.status).toEqual(expected);
    });
  });

  describe('GET /games', () => {
 
    it('should return JSON', async () => {
      const expected = 'application/json';
      const response = await request(server).get('/games');

      expect(response.type).toEqual(expected);
    });

    it('should return an array', async () => {
      const response = await request(server).get('/games');

      expect(Array.isArray(response.body)).toBe(true);
    });

  });

});