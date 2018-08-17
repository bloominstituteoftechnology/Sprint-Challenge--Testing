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
      //console.log(response.body)
      expect(response.status).toEqual(200);
    });
  });

  describe('POST /games', () => {
    it('should respond type JSON', async () => {
      const res = await request(server).post('/games')
      expect(res.type).toEqual('application/json');
    })

    it('should response with status code 201', async () => {
      const res = await request(server).post('/games')
      expect(res.status).toEqual(201);
    })

    it('should return {id, title, genre} in response body', async () => {
      const expected = {id:'4', title: 'game4', genre: 'shooter'}
      const res = await request(server)
        .post('/games')
        .send({id:'4', title: 'game4', genre: 'shooter'})
      expect(res.body).toEqual(expected);
    })

  })    
});
