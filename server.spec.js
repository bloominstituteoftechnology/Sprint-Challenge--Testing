const request = require('supertest');

const { server, games } = require('./server.js');

describe('server.js', () => {
  describe('root endpoint(/)', () => {
    it('should return status code 200 OK', async () => {
      const expected = 200;
      const response = await request(server)
      .get('/');
      expect(response.status).toBe(expected);
    });
     it('should return JSON', async () => {
      const response = await request(server)
      .get('/');
      expect(response.type).toEqual('application/json');
    })
  })

  describe('get /games', () => {
    it('should return status code 200 ok', async () => {
      const expected = 200;
      const response = await request(server)
      .get('/games')
      expect(response.status).toEqual(expected);
    })

    it('should return a list of games, and should return empty array if list is empty', async () => {
      const expected = games;
      const response = await request(server)
      .get('/games')
      expect(response.body).toEqual(expected);
    })
  })
  describe('post /games', () => {
    it('should return status 201 if successful', async () => {
      const expected = 201;
      const response = await request(server)
      .post('/games')
      .send({
        title: 'Secret of Mana',
        genre: 'Action RPG',
        releaseYear: 1993
      })
      expect(response.status).toEqual(expected);
    })
    it('should return status 422 if missing title or genre', async () => {
      const expected = 422;
      const response = await request(server)
      .post('/games')
      .send({
        title: 'The Legend of Zelda: A Link to the Past',
        genre: '',
        releaseYear: 1991
      })
      expect(response.status).toEqual(expected);
    })
  })
})
