//import server
const server = require('./api/server.js');

//import supertest
const request = require('supertest');


describe('GET /games',()=>{

  it('should respond with status code 200', async ()=>{
    const response = await request(server).get('/games');
    expect(response.status).toBe(200);
  });

  it('should return type JSON', async ()=>{
    const response = await request(server).get('/games');
    expect(response.type).toBe('application/json');
  });

  it('should return all games', async ()=>{
    const response = await request(server).get('/games');
    const expected = [
      {
        "title": "Pacman",
        "genre": "Arcade",
        "releaseYear": "1980"
      },
      {
        "title": "Candy Land",
        "genre": "Board",
        "releaseYear": "1949"
      }
    ]
    expect(response.body).toEqual(expected);
  });

});