const request = require('supertest');

const server = require('./server.js');

game = {
  title: "Pacman",
  genre: "Arcade", 
  releaseYear: 1980 
};

describe('server.js', () => {
  // GET
  describe('GET /games', () => {
    it('should return status code 200 OK', async () => {
      const expected = 200;

      const response = await request(server).get('/games');

      expect(response.status).toEqual(expected);
    });

    it('should return a list of games', async () => {
      const expected = true;
      const response = await request(server).get('/games')
      const actual = Array.isArray(response.body)

      expect(actual).toEqual(expected);
    });
  })
  // POST
  describe('POST /games', () => {
    it('should return a 422 code if the information is incomplete', async () => {
      const expected = 422;
      const response = await request(server).post('/games').send({title: false, genre: false,  releaseYear: 1980});
      const actual = response.status;

      expect(actual).toEqual(expected);
    });

    it('should return a 200 code if the information is complete', async () => {
      const expected = 200;

      const response = await request(server).post('/games').send({title: "Pacman", genre: "Arcade",  releaseYear: 1980});

      expect(response.status).toEqual(expected);
    })
  })
})