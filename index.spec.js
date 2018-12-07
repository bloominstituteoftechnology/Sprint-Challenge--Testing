const request = require('supertest')

const server = require('./index.js')


describe('server', () => {
  describe('/ route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/')
      expect(response.status).toBe(200)
    })
   

  })

  describe('games route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/api/games')
      // console.log(response)
      expect(response.status).toBe(200)
    })

    it('should return an object of games', async () => {
      let response = await request(server).get('/api/games')
      expect(typeof response.body).toBe('object')
    })

    it('should return an object with games in it', async () => {
      let response = await request(server).get('/api/games')
      expect(response.body.length).toBeTruthy()
    })

    it('should return an array even if it is empty', async () => {
      let response = await request(server).get('/api/games')
      expect(response.body.length >= 0).toBe(true)
    })
  })
})
