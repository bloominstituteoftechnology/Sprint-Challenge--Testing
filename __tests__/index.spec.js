const request = require('supertest');

const server = require('../api/server.js');

describe('server.js', () => {

  describe('/ route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/')
      expect(response.status).toBe(200);
    })

    it('should return application/json', async () => {
      let response = await request(server).get('/')
      // RED TEST: expect(response.type).toBe('application/xml');
      expect(response.type).toBe('application/json');
    })

    it('should return a JSON object from the index route', async () => {
      const expectedBody = { api: 'Ready!' };
        // RED TEST: const expectedBody = { api: 'up' };
      const response = await request(server).get('/');
      expect(response.body).toEqual(expectedBody);
    })
  })

  describe('POST /games endpoint', () => {
    it('should add title, genre, and releaseYear', async () => {
      let response = await request(server)
        .post('/games')
        .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 })

      expect(response.body).toEqual({ added: 'Arcade: Pacman (1980)'})

      response = await request(server)
      .post('/games')
      .send({ title: 'Pole Position', genre: 'Arcade' })

    expect(response.body).toEqual({ added: 'Arcade: Pole Position (undefined)'})


      // `${genre}: ${title}` 
    })
  })




  // ```js
  // {
  //   title: 'Pacman', // required
  //   genre: 'Arcade', // required
  //   releaseYear: 1980 // not required
  // }
  // ```

  // - in the route handler, validate that the required fields are included inside the body. If the information is incomplete, return a `422` status code.
  // - write tests to verify that the endpoint returns the correct HTTP status code when receiving correct and incorrect game data.
})