const request = require('supertest')

const server = require('./api/server.js')

describe('server.js', () => {
  describe('POST /games', () => {
    it('should return 201 if good request is sent', async () => {
      const game = {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
      }
      let response = await request(server)
        .post('/games')
        .send({ ...game })
      expect(response.status).toBe(201)
    })

    it('should return 201 if good request is sent without releaseYear', async () => {
      const game = {
        title: 'Pacman2',
        genre: 'Arcade'
      }
      let response = await request(server)
        .post('/games')
        .send({ ...game })
      expect(response.status).toBe(201)
    })

    it('should return 422 if duplicate game is posted', async () => {
      const game = {
        title: 'Pacman3',
        genre: 'Arcade'
      }

      // first post
      await request(server)
        .post('/games')
        .send({ ...game })

      // second post
      let response = await request(server)
        .post('/games')
        .send({ ...game })

      expect(response.status).toBe(422)
    })

    it('should return 422 if bad request is sent', async () => {
      const game = {
        title: 'Pacman'
      }
      let response = await request(server)
        .post('/games')
        .send({ ...game })

      expect(response.status).toBe(422)
    })
  })

  describe('GET /games', () => {
    it('should return 200 if good request is sent', async () => {
      let response = await request(server).get('/games')
      expect(response.status).toBe(200)
    })

    it('should return an array', async () => {
      let response = await request(server).get('/games')
      expect(Array.isArray(response.body)).toBe(true)
    })

    it('should return game objects in the correct format', async () => {
      const response = await request(server).get('/games')
      const { title, genre } = response.body[0]
      const valid = !!title && !!genre
      expect(valid).toBe(true)
    })
  })

  // describe('DELETE /games/:id', () => {
  //   it('should return 201 if good request is sent', async () => {
  //     const newGame = {
  //       title: 'Pacman',
  //       genre: 'Arcade',
  //       releaseYear: 1980
  //     }

  //     await request(server)
  //       .post('/games')
  //       .send({ ...newGame })

  //     await request(server)
  //       .de
  //     expect(response.status).toBe(201)
  //   })

  //   it('should return 400 if bad request is sent', async () => {
  //     let response = await request(server).delete('/games')
  //     expect(response.status).toBe(400)
  //   })
  // })
})
