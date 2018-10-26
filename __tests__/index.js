const request = require('supertest');

const server = require('../api/server.js')

describe('server.js', () => {
  describe.skip('root endpoint (/)', () => {

    it('should return confirmation the server is up', async () => {
      const expected = { api: 'running' }
      const response = await request(server).get('/')
      expect(response.body).toEqual(expected)
    })

  })

  describe('POST /games endpoint', () => {

    const newGame = {
      title: 'Pacman',
      genre: 'Arcade',
      releaseYear: 1980
    }

    const trivialIncompleteGame = {
      title: 'Pacman',
      genre: 'Arcade',
    }

    const incompleteGame1 = {
      title: 'Pacman',
      releaseYear: 1980
    }

    const incompleteGame2 = {
      genre: 'Arcade',
      releaseYear: 1980
    }

    const incorrectGame = {
      title: 12345,
      genre: true,
      releaseYear: 'nineteen eighty-four'
    }

    it('should return status code 200 when successful', async () => {
      const expected = 200
      const response = await request(server).post('/games').send(newGame)
      expect(response.status).toBe(expected)
    })

    it('should return status code 200 when sent without releaseYear', async () => {
      const expected = 200
      const response = await request(server).post('/games').send(trivialIncompleteGame)
      expect(response.status).toBe(expected)
    })

    it('should return status code 422 if info is incomplete', async () => {
      const expected = 422
      const response = await request(server).post('/games').send(incompleteGame1)
      expect(response.status).toBe(expected)
    })

    it('should return status code 422 if info is incomplete', async () => {
      const expected = 422
      const response = await request(server).post('/games').send(incompleteGame2)
      expect(response.status).toBe(expected)
    })

    it.only('should return status code 422 if info is incomplete', async () => {
      const expected = 300
      const response = await request(server).post('/games').send(incorrectGame)
      expect(response.status).toBe(expected)
    })

  })
})
