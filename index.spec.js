//import server
const server = require('./api/server.js');

//import supertest
const request = require('supertest');


describe.skip('GET /games testing',()=>{

  it('should respond with status code 200', async ()=>{
    const response = await request(server).get('/games');
    expect(response.status).toBe(200);
  });

  it('should return type JSON', async ()=>{
    const response = await request(server).get('/games');
    expect(response.type).toBe('application/json');
  });

  it('should return all games, or an empy array if no games', async ()=>{
    const response = await request(server).get('/games');
    const expected = (JSON.parse(response.text).length === 0)
    ? [] 
    : JSON.parse(response.text); 

    expect(response.body).toEqual(expected);
  });


});

describe('POST /games testing',()=>{

  it('should respond with status code 201', async ()=>{
    const response = await request(server).post('/games')
      .send({
        "title": "Asteroids",
        "genre": "Arcade",
        "releaseYear": "1979"
      });
    expect(response.status).toBe(201);
  });

  it('should return message to client if request body is in an incorrect format', async ()=>{
    //attempt to pass data as an array
    const response = await request(server).post('/games')
      .send([
        "title : Asteroids",
        "genre : Arcade",
        "releaseYear :1979"
      ])
    expect(response.body).toEqual({error: "Incorrect data format"});
  });

  it('should return message to client if request body is missing required properties', async ()=>{
    //attempt to pass data missing genre
    const response = await request(server).post('/games')
      .send({
        "title": "Asteroids",
        "releaseYear": "1979"
      })
    expect(response.body).toEqual({error: "Missing game data"});
  });




});

