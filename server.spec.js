const request = require('supertest');
const server = require('./server');

// does it return the correct status code for the input provided?
// does it return the data in the expected format?
// does the data returned, if any, has the right content?


  // - in the route handler, validate that the required fields are included inside the body.If the information is incomplete,
  //   return a `422` status code. -
  //   write tests to verify that the endpoint returns the correct HTTP status code when receiving correct and incorrect game data.


describe('game server testing', ()=>{

//   - The `GET /games` endpoint should return the list of games and HTTP status code 200.
// - Write a test to make sure this endpoint always returns an array, even if there are no games stored. If there are no games to return, the endpoint should return an empty array.


  describe('GET all games at [/games]', ()=>{
    it('should return status code "200"', async ()=>{
      const expected = 200;
      const result = await request(server).get('/games').then(response =>{
        expect(response.status).toBe(expected);
      })
    })

    it('should return JSON format', async ()=>{
      const expected = 'application/json' 
      const result = await request(server).get('/games').then(response =>{
      expect(response.type).toBe(expected);
      })
    })

    it('should return an empty array if no games in dB', async () => {
      
      const expected = [];

      const result = await request(server).get('/games').then(response =>{
        expect(response.body).toEqual(expect.arrayContaining(expected));
      })
    })

    it('should return data in JSON format', async () => {
      const expected = [{
        name: 'pac-man',
        genre: 'arcade',
        year: '1980'
      }];
      const result = await request(server).get('/games').then(response =>{
        expect(response.body).toEqual(expected);
      });

    })

  })

  describe('POST new game to [/games]', ()=>{

    it('should return status code 201', async () => {
      const testGame = {
        "name": "tetris",
        "genre": "console",
        "year": "1989"
      }

      const expected = 201;
      const result = await request(server).post('/games').send(testGame)
      expect(result.status).toEqual(expected);

    });
    
    it('should return a status code of "422" if required fields are missing --test missing genre', async () => {

      const testGame = {
        "name": "tetris",
        "year": "1989"
      }
      const expected = 422;
      const result = await request(server).post('/games').send(testGame)
      expect(result.status).toEqual(expected);
    })

      it('should return a status code of "422" if required fields are missing --test missing name', async () => {
        const testGame = {
          "genre": "console",
          "year": "1989"
        }
        const expected = 422;
        const result = await request(server).post('/games').send(testGame)
        expect(result.status).toEqual(expected);
      })
    
    it('should return JSON', async () => {
      const testGame = {
        "name": "tetris",
        "genre": "console",
        "year": "1989"
      }

      const expected = 'application/json';
      const result = await request(server).post('/games').send(testGame)
      expect(result.type).toEqual(expected);
    });

    it('should return new game data in JSON format', async ()=>{
      const testGame = {
        "name": "pacman2",
      "genre": "console",
        "year": "1989"
      }

      const expected = {
        "name": "pacman2",
        "genre": "console",
        "year": "1989"
      };
      const result = await request(server).post('/games').send(testGame)
      expect(result.body).toEqual(expected);

    });

  })
})