const request = require('supertest')

const server = require('./server.js')

describe('server.js', () => {
  describe('POST /games error response', () => {
    it('should return status code 422 if title or genre field is not provided', async () => {
      const game1 = { title: 'Contra' }
      const expected = 422

      const res1 = await request(server).post('/games').send(game1)
      expect(res1.status).toEqual(expected)

      const game2 = { genre: 'Action' }
      const res2 = await request(server).post('/games').send(game2)
      expect(res2.status).toEqual(expected)
    })

    it('should return JSON type response', async () => {
      const game = { title: 'Contra' }
      const expected = 'application/json'

      const res = await request(server).post('/games').send(game)
      expect(res.type).toEqual(expected)
    })

    it('should return an error message', async () => {
      const game = { title: 'Contra' }
      const expected = { error: 'title and genre field are required' }

      const res = await request(server).post('/games').send(game)
      expect(res.body).toEqual(expected)
    })

    it('should return status code 405 if game title not unique', async () => {
      const game1 = {
        title: 'Contra',
        genre: 'Action',
        releaseYear: 1987
      }

      const expected = 405
      const res1 = await request(server).post('/games').send(game1)
      const res2 = await request(server).post('/games').send(game1)
      expect(res1.status).toEqual(201)
      expect(res2.status).toEqual(expected)
    })
  })

  describe('POST /games success response', () => {
    it('should return status code 201', async () => {
      const game = {
        title: 'ToeJam & Earl',
        genre: 'Action',
        releaseYear: 1991
      }
      const expected = 201
      const res = await request(server).post('/games').send(game)
      expect(res.status).toEqual(expected)
    })

    it('should return JSON type response', async () => {
      const game = {
        title: 'Mutant League Football',
        genre: 'Arcade',
        releaseYear: 1993
      }
      const expected = 'application/json'
      const res = await request(server).post('/games').send(game)

      expect(res.type).toEqual(expected)
    })

    it('should have an id field (number) in the response body', async () => {
      const game = {
        title: 'Super Mario Kart',
        genre: 'Racing',
        releaseYear: 1992
      }
      const res = await request(server).post('/games').send(game)
      expect(res.body.id).toBeDefined()
      expect(typeof res.body.id).toBe('number')
    })
    it('response body title, genre, releaseYear fields should match request input', async () => {
      const game = {
        title: 'Chrono Trigger',
        genre: 'RPG',
        releaseYear: 1995
      }
      const res = await request(server).post('/games').send(game)
      expect(res.body.title).toEqual(game.title)
      expect(res.body.genre).toEqual(game.genre)
      expect(res.body.releaseYear).toEqual(game.releaseYear)
    })
  })

  describe('GET /games', () => {
    it('should return status code 200', async () => {
      const expected = 200

      const res = await request(server).get('/games')
      expect(res.status).toEqual(expected)
    })

    it('should return an array of games', async () => {
      const res = await request(server).get('/games')
      expect(Array.isArray(res.body)).toBeTruthy()
    })
  })
})
