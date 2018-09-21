const request = require('supertest');
const server = require('./server');


describe('server.js', () => {
  it('runs tests', () => {
    expect(true).toBeTruthy();
  });

  describe('GET for /games', () => {
    it('returns 200', async () => {
      const response = await request(server).get('/games');
      expect(response.status).toBe(200);
    });

    it('returns Array', async () => {
      const expected = [];
      const response = await request(server).get('/games');
      expect(response.status).toEqual(expect.arrayContaining(expected));
    });
    
    it('should return JSON', async () => {
      const response = await request(server).get('/games');
      expect(response.type).toEqual('application/json');
    });
  });

  describe('POST for /games', () => {
    it('returns 200', async () => {
      const response = await request(server).post('/games')
        .send({title: 'Need For Speed', genre: 'racing', releaseYear: 2000});
      expect(response.status).toBe(200);
    });

    it('returns 422', async () => {
      const response = await request(server).post('/games')
        .send({title: 'Need For Speed', releaseYear: 2000});
      expect(response.status).toBe(422);
    });
    
    it('should return JSON', async () => {
      const response = await request(server).post('/games')
      .send({title: 'Need For Speed', genre: 'racing', releaseYear: 2000});
      expect(response.type).toEqual('application/json');
    });
  });

  describe('DELETE for /games', () => {
    it('returns 200', async () => {
      const response = await request(server).delete('/games/2');
      expect(response.status).toBe(200);
    });
        
    it('should return JSON', async () => {
      const response = await request(server).delete('/games/2');
      expect(response.type).toEqual('application/json');
    });
  });

});
