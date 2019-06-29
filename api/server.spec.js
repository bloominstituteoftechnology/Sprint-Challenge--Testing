const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');

describe('server.js', () => {
  describe('GET /games', () => {
    afterEach(async () => {
      await db('games').truncate()
    })
    it('should return status 200', () => {
      return request(server)
      .get('/games')
      .then(res => {
        expect(res.status).toBe(200)
      })
    })
    it('should return empty string', () => {
      return request(server)
      .get('/games')
      .then(res => {
        expect(res.body).toEqual([]);
      })
    })
    it('return games in db', async () => {
      const games = [
        { id: 1, title: 'Mortal Kombat', genre: 'Arcade', releaseYear: 1999},
        { id: 2, title: 'Tekken', genre: 'Arcade', releaseYear: 2000}
      ]

      await db('games').insert(games)

      const res = await request(server).get('/games')
      expect(res.body).toEqual(games);
    })
  })

  describe('POST /games', () => {
    it('should return status 200', async () => {
      const games = [
        { id: 1, title: 'Mortal Kombat', genre: 'Arcade', releaseYear: 1999},
        { id: 2, title: 'Tekken', genre: 'Arcade', releaseYear: 2000}
      ]
      return request(server)
      .post('/games').insert(games)
      const res = await request(server).post('/games')
      expect(res.body).toEqual(games)
    })
  })
})
