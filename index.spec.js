const request = require('supertest');

const server = require('./api/server.js');


describe('server', () => {
  describe('GET /', () => {
    
    it('should return status code 200', async () => {
      const res = await request(server).get('/');
  
      expect(res.status).toBe(200);
    });

    it('should return JSON', async () => {
      const res = await request(server).get('/');
      expect(res.type).toBe('application/json');
    });

    it('should return { message: "Server g2g" }', async  () => {
      const res = await request(server).get('/');

      expect(res.body).toEqual({ message: 'Server g2g' });
    })
  });
  
  describe('GET /games', () => {
    it('returns the array of games', async () => {
      const res = await request(server).get('/games');

      expect(res.type).toBe('application/json');
    });

    it('returns status code 200', async () => {
      const res = await request(server).get('/games');
  
      expect(res.status).toBe(200);
    });

    it('returns an array', async () => {
      const res = await request(server).get('/games');
      
      expect(Array.isArray(res.body)).toBe(true);
  
    });
  });

  describe('POST /games', () => {
    it('returns status code 422 if fields are empty', async () => {
      const res = await request(server)
        .post('/games')
        .send({ title: 'Metal Slugg', releaseYear: 1984 });

        expect(res.status).toBe(422);
    });

    it('returns status code 201', async () => {
      
      const res = await request(server)
        .post('/games')
        .send({ title: 'Pokemon Red', genre: 'RPG' })

        expect(res.status).toBe(201);
    })

    it('returns message that game was added', async () => {
      const res = await request(server)
        .post('/games')
        .send({ title: 'Mario', genre: 'Arcade', releaseYear: 1998 })

        expect(res.body).toEqual({ message: `Mario has been added` })
    })
  })
});