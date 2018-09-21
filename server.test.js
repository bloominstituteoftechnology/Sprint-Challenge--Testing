const request = require("supertest");
const server = require("./server.js");

const dummyGame = {
  title: 'Street Fighter',
  genre: 'Arcade',
  releaseYear: 1987
};

const wrongDummyGame = {
  title: null,
  genre: 'Arcade',
  releaseYear: 1987
};

describe('server.js', () => {
  it('should run tests', () => {
    expect(true).toBeTruthy();
  });
  describe('GET /games endpoint', () => {
    it('Should return a status code of 200 when the request succeeds', async () => {
      const response = await request(server).get('/games');
      expect(response.status).toEqual(200);
    });

    it('Should return an array of games', async () => {
      const response = await request(server).get('/games');
      expect(response.body).toEqual(expect.any(Array));
    });
    it('Should return an empty array even if there are no games', async () => {
      const response = await request(server).get('/games');
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /games endpoint', () => {
    it('Should return a status code of 201 on successful post', async () => {
      const response = await request(server).post('/games')
      .send(dummyGame);
      expect(response.status).toEqual(201);
    });
    it('Should return \'Your game was saved!\' on successful post', async () => {
      const response = await request(server).post('/games')
      .send(dummyGame);
      expect(response.body).toEqual({ message: 'Your game was saved!'});
    });
    it('Should return a 422 status code when incomplete game information is saved', async () => {
      const response = await request(server).post('/games')
      .send(wrongDummyGame);
      expect(response.status).toEqual(422);
    })
  })
})
