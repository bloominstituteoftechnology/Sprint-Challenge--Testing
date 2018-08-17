const request = require('supertest');
const server = require('../server.js');

describe('server.js', () => {
  describe('POST /games', () => {
    it('should return 201 if the new game has the required fields', async () => {
      await request(server)
        .post('/games')
        .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 })
        .expect('Content-Type', /json/)
        .expect(201);
    });

    it('should return 422 if the new game does NOT have the required fields', async () => {
      await request(server)
        .post('/games')
        .send({ title: 'Pacman', genre: 'Arcade' })
        .expect('Content-Type', 'application/json')
        .expect(422);
    })

    describe('GET /games', () => {
      it('should return an array of games', async () => {
        await request(server).get('/games')
          .expect('Content-Type', /json/)
          .expect(200)
      })
      
      it('should return an empty array if no games are stored in the database', async () => {
        await request(server).get('/games')
          .expect('Content-Type', /json/)
          .expect(200, []);
      })
    })


  })
})