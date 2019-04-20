const server = require('./server.js');

const request = require('supertest');

describe('testing module', () => {

  describe('GET /games endpoint test', () => {
    it('should return status code 200', async () => {
      const res = await request(server).get('/games')

       expect(res.status).toBe(200);
    });

    it('should return JSON', async () => {
      const res = await request(server).get('/games');

       expect(res.type).toBe('application/json');
    });

    it('should send back the correct type', async () => {
      const res = await request(server).get('/games');

       expect(typeof res.body).toBe('object');
    })
    it('should return the array', async () => {
      const res = await request(server).get('/games');

      const expected = [
        {
            title: 'Pacman',
            genre: 'Arcade',
            releaseYear: 1980
        },
        {
            title: 'World of Warcraft',
            genre: 'RPG',
            releaseYear: 2004
        },
        {
            title: 'Tropico 5',
            genre: 'CMS',
            releaseYear: 2014
        }
      ];

      expect(res.body).toEqual(expected);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
  describe('POST /games endpoint test', () => {
    it('should return a 422 status code if information is incomplete', async () => {
      const incompleteGame = 
        {
        title: "Plants vs Zombies 0",
        releaseYear: 2009
      }
    
      const res = await request(server)
      .post('/games')
      .send(incompleteGame);

       expect(res.status).toBe(422);
    });

    it('should return JSON', async () => {
      const newGame = 
        {
        title: 'Plants vs Zombies 1 ', 
        genre: 'Tower defense', 
        releaseYear: 2009 
      }
    
    const res = await request(server).post('/games').send(newGame);
       expect(res.type).toBe('application/json');
    });


    it('should return status 201 if information is right', async () => {
      const body = 
        {
        title: 'Plants vs Zombies 2', 
        genre: 'Tower', 
        releaseYear: 2009 
      }
  

       const res = await request(server).post('/games').send(body);

       expect(res.status).toBe(201);
    });
 
  });





});
