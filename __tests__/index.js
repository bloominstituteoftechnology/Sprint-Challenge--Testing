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
    }

    it('should return status 200 when successful', async () => {
      const expected = 200
      const response = await request(server).post('/games').send(newGame)
      expect(response.status).toBe(expected)
    })

    it('should return status 200 when sent without releaseYear', async () => {
      const expected = 200
      const response = await request(server).post('/games').send(trivialIncompleteGame)
      expect(response.status).toBe(expected)
    })

    it('should return status 422 if info is incomplete', async () => {
      const expected = 422
      const response = await request(server).post('/games').send(incompleteGame1)
      expect(response.status).toBe(expected)
    })

    it('should return status 422 if info is incomplete', async () => {
      const expected = 422
      const response = await request(server).post('/games').send(incompleteGame2)
      expect(response.status).toBe(expected)
    })

    it('should return status 415 if info is not proper data type', async () => {
      const expected = 415
      const response = await request(server).post('/games').send(incorrectGame)
      expect(response.status).toBe(expected)
    })

  })

  describe('GET /games endpoint', () => {

    const dbGames = [
      {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
      },
      {
        title: 'Super Mario',
        genre: 'Nintendo',
      },
      {
        title: 'Fifa',
        genre: 'Xbox/Play Station',
        releaseYear: 2018
      }
    ]

    it('should return status 200', async () => {
      const expected = 200
      const response = await request(server).get('/games')
      expect(response.status).toEqual(expected)
    })

    it('should return an array type', async () => {
      const expected = true
      const response = await request(server).get('/games')
      expect(response.body.constructor === Array).toBe(expected)
    })

    it('should return an array of games', async () => {
      const expected = dbGames
      const response = await request(server).get('/games')
      expect(response.body).toEqual(expected)
    })


  })


})

// should return status code 200
// should return the response in json format
// should return {api: "running"} in the body
