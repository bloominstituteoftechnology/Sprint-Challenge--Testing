const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  it('GET / returns 200 status code', async () => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
  });

  it('server running', async () => {
    const expectedBody = { api: 'running' };
    const response = await request(server).get('/');
    expect(response.body).toEqual(expectedBody);
  });

  describe('GET /games', () => {
    it('respond with 200 and json', done => {
      request(server)
        .get('/games')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('responds with 200 and an empty array if no data', done => {
      request(server)
        .get('/games')

        .expect('Content-Type', /json/)
        .expect(200, [], done);
    });
  });

  describe('POST /games', () => {
    it('respond with 201 created', done => {
      request(server)
        .post('/games')
        .send({ title: 'Pacman3', genre: 'Arcade', releaseYear: 1980 })
        .expect(res => {
          res.body.id = 'some Id';
        })
        .expect(201, done);
    });

    it('responds with 422 if all fields not complete', done => {
      request(server)
        .post('/games')
        .send({ title: 'Pacman3' })
        .expect('Content-Type', /json/)
        .expect(422, '"All fields must be complete."', done);
    });

    it('responds with 405 if name already taken', done => {
      request(server)
        .post('/games')
        .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 })
        .expect('Content-Type', /json/)
        .expect(405, '"Title must be unique"', done);
    });
  });

  describe('GET /games/:id', () => {
    it('respond with 200 and json', done => {
      request(server)
        .get('/games/1')
        .expect(
          200,
          {
            id: 1,
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980,
          },
          done,
        );
    });

    it('responds with 404 if id doesnt exist', done => {
      request(server)
        .get('/games/3')
        .expect('Content-Type', /json/)
        .expect(404, '"Game does not exist"', done);
    });
  });

  describe('DELETE /games/:id', () => {
    it('responds with 200 and 1 if delete successful', done => {
      request(server)
        .delete('/games/1')
        .expect(200, '1', done);
    });

    it('responds with 400 and 0 if user doesnt exist', done => {
      request(server)
        .delete('/games/6')
        .expect(404, '0', done);
    });
  });
});
