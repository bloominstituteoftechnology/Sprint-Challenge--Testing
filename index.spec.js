const request = require('supertest')

const server = require('./api/server.js')

describe('server.js', () => {
  describe('POST /games', () => {
    it('should return 201 if good request is sent', async () => {
      const newGame = {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
      }
      let response = await request(server)
        .post('/games')
        .send({ ...newGame })
      expect(response.status).toBe(201)
    })

    it('should return 201 if good request is sent without releaseYear', async () => {
      const newGame = {
        title: 'Pacman',
        genre: 'Arcade'
      }
      let response = await request(server)
        .post('/games')
        .send({ ...newGame })
      expect(response.status).toBe(201)
    })

    it('should return 422 if bad request is sent', async () => {
      const newGame = {
        title: 'Pacman'
      }
      let response = await request(server)
        .post('/games')
        .send({ ...newGame })

      expect(response.status).toBe(422)
    })
  })

  describe('DELETE /games', () => {
    it('should return 200 if good request is sent', async () => {
      const item = 'walrus'
      let response = await request(server)
        .delete(`/games/`)
        .send({ item })
      expect(response.status).toBe(200)
    })

    it('should return 400 if bad request is sent', async () => {
      let response = await request(server).delete('/games')
      expect(response.status).toBe(400)
    })
  })
})
