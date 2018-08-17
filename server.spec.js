const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  describe('root endpoint', () => {
    test('should return status code 200', async () => {
      const expected = 200;
      const response = await request(server).get('/');
      expect(response.status).toEqual(expected);
    })
    test('should return json', async () => {
      const response = await request(server).get('/');
      expect(response.type).toEqual('application/json');
    })
    test('should return "API is running"', async () => {
      const expected = {api: 'API is running'}
      const response = await request(server).get('/');
      expect(response.body).toEqual(expected);
    })
  })
  describe('POST to /games', () => {
    test('should return status code 201 if successful', async () => {
      const expected = 201;
      const response = await request(server)
        .post('/games')
        .send({title: 'Pong', genre: 'Arcade', releaseYear: 1972})
      expect(response.status).toEqual(expected);
    })
    test('should return status code 405 if missing info', async () => {
      const expected = 405;
      const response = await request(server)
        .post('/games')
        .send({title: 'Pacman', genre: 'Arcade', releaseYear: 1980})
      expect(response.status).toEqual(expected);
    })
    test('should return json', async () => {
      const response = await request(server)
        .post('/games')
        .send({title: 'Pong', genre: 'Arcade', releaseYear: 1972})
      expect(response.type).toEqual('application/json');
    })
    test('should return the new game', async () => {
      const expected = {title: 'Pong', genre: 'Arcade', releaseYear: 1972}
      const response = await request(server)
        .post('/games')
        .send({title: 'Pong', genre: 'Arcade', releaseYear: 1972})
      expect(response.body).toEqual(expected);
    })
  })
  describe('GET to /games', () => {
    test('should return status code 200', async () => {
      const expected = 200;
      const response = await request(server).get('/games');
      expect(response.status).toEqual(expected);
    })
    test('should return json', async () => {
      const response = await request(server).get('/games');
      expect(response.type).toEqual('application/json');
    })
    test('should return list of games', async () => {
      const expected = [
        {title: 'Pacman', genre: 'Arcade', releaseYear: 1980},
        {title: 'Monopoly', genre: 'Board', releaseYear: 1935},
        {title: 'Tetris', genre: 'Arcade', releaseYear: 1984}
      ]
      const response = await request(server).get('/games');
      expect(response.body).toEqual(expected);
    })
  })
})