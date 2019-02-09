const request = require('supertest');
const server = require('./routes.js');

describe('the post endpoint', () => {
  it('takes in a object with title, genre, and releaseYear', async () => {
    const body = {title:'pacman', genre: "Arcade", releaseYear: 1980}
    const response = await request(server).post('/posts').send(body);
    expect (response.status).toBe(201)
    .catch(err => res.status(422).send(err))
  })
})