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
  })

  describe('POST /games success response', () => {
    let game, res
    beforeEach(async () => {
      game = {
        title: 'Contra',
        genre: 'Action',
        releaseYear: 1987
      }
      res = await request(server).post('/games').send(game)
    })
    it('should return status code 201', () => {
      const expected = 201
      expect(res.status).toEqual(expected)
    })

    it('should return JSON type response', () => {
      const expected = 'application/json'
      expect(res.type).toEqual(expected)
    })

    it('should have an id field (number) in the response body', () => {
      expect(res.body.id).toBeDefined()
      expect(typeof res.body.id).toBe('number')
    })
  })
})
