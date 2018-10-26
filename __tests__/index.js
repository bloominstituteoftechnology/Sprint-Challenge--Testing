const request = require('supertest');

const server = require('../api/server.js')

describe('server.js', () => {
  describe('root endpoint (/)', () => {

    it('should return something', async () => {
      const expected = { api: 'running' }
      const response = await request(server).get('/')
      expect(response.body).toEqual(expected)
    })



  })
})
