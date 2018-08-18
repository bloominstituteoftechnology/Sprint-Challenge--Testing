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
    it.skip('should respond type JSON', async () => {
      const res = await request(server).post('/games')
      expect(res.type).toEqual('application/json');
    })

    it.skip('should response with status code 201', async () => {
      const res = await request(server).post('/games')
      expect(res.status).toEqual(201);
    })

    it.skip('should return {id, title, genre} in response body', async () => {
      const expected = {id:4, title: 'game4', genre: 'shooter'}
      const res = await request(server)
        .post('/games')
        .send({id: 4, title: 'game4', genre: 'shooter'})
      expect(res.body).toEqual(expected);
    })

    it('should return message "The game title already exists in database"', async () => {
      const expected = {message: 'The game already exists in database'}
      const res = await request(server)
        .post('/games')
        .send({id: 5, title:'game3', genre:'action'});
      console.log(res.body);
      expect(res.body).toEqual(expected);
    })
  })    
});
