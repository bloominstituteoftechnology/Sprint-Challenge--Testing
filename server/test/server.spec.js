const request = require('supertest')
const server = require('../server')

describe('server.js', () => {
  describe('POST /games', () => {
    it('should return a 422 status code if genre is missing', (done) =>{
      const missingGenre = { title: 'Pacman', releaseYear: 1980 }

      request(server)
        .post('/games')
        .send(missingGenre)
        .set('Accept', 'application/json')
        .expect(422, done)
    })

    it('should return a 422 status code if title is missing', (done) =>{
      const missingTitle = { genre: 'Arcade', releaseYear: 1980 }

      request(server)
        .post('/games')
        .send(missingTitle)
        .set('Accept', 'application/json')
        .expect(422, done)
    })

    it('should return a 422 status code if both genre and title is missing', (done) =>{
      const missingBoth = { releaseYear: 1980 }

      request(server)
        .post('/games')
        .send(missingBoth)
        .set('Accept', 'application/json')
        .expect(422, done)
    })

    it('should return a 201 status when the user posts correct information', (done) => {
      const validData = {
        title: 'Pacman', 
        genre: 'Arcade', 
        releaseYear: 1980 
      }

      request(server)
        .post('/games')
        .send(validData)
        .set('Accept', 'application/json')
        .expect(201, done)
    })
  })

  describe('GET /games', () => {
    it('should return an array of games', (done) => {
      request(server)
        .get('/games')
        .set('Accept', 'application/json')
        .expect(200)
        .then(response => {
           expect(Array.isArray(response.body)).toBe(true)
           done()
        })
    })

    it('should return a status of 200', (done) => {
      request(server)
        .get('/games')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })

    it('should return an empty array if there is no games stored', (done) => {
      request(server)
        .get('/games')
        .set('Accept', 'application/json')
        .expect(200)
        .then(response => {
           expect(response.body.length).toBe(0)
           done()
        })
    })
  })
})