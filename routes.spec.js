const request = require('supertest');
const server = require('./routes.js');
const db = require('./database/dbConfig');

describe('the post endpoint', () => {
  it('takes in a object with title, genre, and releaseYear', async  () => {
    const body = {title:'Tetris', genre: "Arcade", releaseYear: 1980}
    const response = await request(server).post('/games').send(body);
    expect (response.status).toBe(200)
    
  })
  it('responds with 422 when body is missing', async() => {
    const body = {};
    const response = await request(server).post('/games').send(body);
    expect (response.status).toBe(422)
    
  })
  it('responds with an ID', async() => {
    const body = { title: 'NoneYa', genre: "Arcade", releaseYear: 1980 }
    const response = await request(server).post('/games').send(body);
    expect(response.body).toBeDefined()
  })
})