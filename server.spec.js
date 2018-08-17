const request = require('supertest');
const server = require('./server');

// does it return the correct status code for the input provided?
// does it return the data in the expected format?
// does the data returned, if any, has the right content?


describe('game server testing', ()=>{

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

    it('should return data in JSON format', async ()=>{
      
      const expected = [{
        name: 'pac-man',
        type: 'arcade',
        year: '1980'
      }]

      const result = await request(server).get('/games').then(response =>{
        expect(response.body).toEqual(expected);
      })
    })

  })

  describe('POST new game to [/games]', ()=>{

    it('should return status code 201', async () => {
      const testGame = {
        "name": "tetris",
        "type": "console",
        "year": "1989"
      }

      const expected = 201;
      const result = await request(server).post('/games').send(testGame)
      expect(result.status).toEqual(expected);

    })
    
    it('should return JSON', async () => {
      const testGame = {
        "name": "tetris",
        "type": "console",
        "year": "1989"
      }

      const expected = 'application/json';
      const result = await request(server).post('/games').send(testGame)
      expect(result.type).toEqual(expected);
    })

    it('should return new game data in JSON format', async ()=>{
      const testGame = {
        "name": "tetris",
        "type": "console",
        "year": "1989"
      }

      const expected = {
        "name": 'tetris',
        type: 'console',
        year: '1989'
      };
      const result = await request(server).post('/games').send(testGame)
      expect(result.body).toEqual(expected);
    })
  })
})