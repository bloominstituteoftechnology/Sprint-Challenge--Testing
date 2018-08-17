const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
  describe('get /games', () => {
    it('should return status code 200 ok', async () => {
      const expected = 200;
      const response = await request(server)
      .get('/games')
      expect(response.status).toEqual(expected);
    })

    it('should return a list of games', async () => {
      const expected = server.games;
      const response = await request(server);
      .get('/games')
      expect(response.status).toEqual(expected);
    })

    it('should return an array, even if array is empty', async () => {
      const expected = [];
      const res = await request(server)
      .get('/games')
      expect(response.body).toEqual(expected);
    })
  })
})






  describe('POST /greet/:name', () => {
    it('should return { hello: name } when name provided inside body', async () => {
      // arrange
      const expected = { hello: 'frodo baggins' };

      // act
      const response = await request(server)
        .post('/greet/frodo')
        .send({ lastName: 'baggins' });

      // assert
      expect(response.body).toEqual(expected);
    });
  });
});
