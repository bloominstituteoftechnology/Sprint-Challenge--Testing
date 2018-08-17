const request = require('supertest');
const server = require('./server');

describe(' server ', () => {
  describe('GET /games', () => {    
    it('should response type JSON', async () => {
      const response = await request(server).get('/games');
      expect(response.type).toEqual('application/json');
    })
    it('should response with status code 200', async () => {
      const response = await request(server).get('/games')
      expect(response.status).toEqual(200);
    });
  });


   
});
