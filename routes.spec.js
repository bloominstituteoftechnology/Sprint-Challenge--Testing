const request = require('supertest');
const server = require('./routes.js');
const db = require('./database/dbConfig');

describe('the post endpoint', () => {
  it('takes in a object with title, genre, and releaseYear', async  () => {
    const body = {title:"PacMan2", genre: "Arcade", releaseYear: 1980}
    const response = await request(server).post('/games').send(body);
    expect (response.status).toBe(200)
    
  })
  it('responds with 422 when body is missing', async() => {
    const body = {};
    const response = await request(server).post('/games').send(body);
    expect (response.status).toBe(422)
    
  })
  it('responds with an ID', async() => {
    const body = { title: "Dig Dug", genre: "Arcade", releaseYear: 1985 }
    const response = await request(server).post('/games').send(body);
    expect(response.body).toBeDefined()
  })
})

describe('the get endpoint for games', () => {
  it ('responds with 200', async() => {
    const response = await request(server).get('/games');
    expect(response.status).toBe(200);
  })
  it('responds with json', async () => {
    const response = await request(server).get('/games');
    expect(response.type).toMatch(/json/i);
  });
  it('sends correct object', async () => {
    const response = await request(server).get('/games');
    expect(response.body).toEqual([]);
  });
})