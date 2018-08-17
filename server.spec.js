const request = require('supertest')

const server = require('./server')

describe('GET [/games]', () => {
  it('should return a status code of 200', async () => {
    const req = await request(server).get('/games')
    expect(req.status).toBe(200)
  })
})
