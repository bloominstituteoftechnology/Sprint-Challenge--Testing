const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {
  // test for POST ENDPOINT
  describe('POST /games', () => {
    // check for adding content inside the db
    it('should add a game', async () => {
      const game = {
        "title": "Tekken World Cup",
        "genre": "Arcade",
        "releaseYear": 1985
      };
      
      const response = await request(server)
        .post(`/games`)
        .send({game});

      const expected = [
        {
          "title": "Pacman",
          "genre": "Arcade",
          "releaseYear": 1980
        },
        {
          "title": "Centipede",
          "genre": "Arcade",
          "releaseYear": 1980
        },
        {
          "title": "Galaga",
          "genre": "Arcade",
          "releaseYear": 1981
        },
        {
          "title": "Ateriods",
          "genre": "Arcade",
          "releaseYear": 1979
        },
        {
          "title": "Tekken World Cup",
          "genre": "Arcade",
          "releaseYear": 1985
        }
      ]
      
      
      expect(response.body).toEqual(expected);
    });

    // check for correct http status code
    it('should return status code 201', async () => {
      const response = await request(server).post('/games');

      expect(response.status).toBe(201);
    });
  });

  
});