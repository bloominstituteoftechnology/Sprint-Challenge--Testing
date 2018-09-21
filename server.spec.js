const request = require('supertest'); 

const server = require('./server.js');

describe('server.js', () =>{
  it('runs the tests ', () => {
    expect(true).toBeTruthy();
  });
  it('test whether the server is up and running', async () => {
    const response = await request(server).get('/');
    
    expect(response.status).toEqual(200); 
    expect(response.text).toEqual("Server Up and running");
  });
  describe('GET/', () => {
    it('should return an array', async () => {
      const response = await request(server).get('/games');

      expect(Array.isArray(response.body)).toBeTruthy();
    });
    it('should return status 200', async () => {
      const response = await request(server).get('/games');

      expect(response.status).toEqual(200); 
    });
    it('should return response type application/json ', async () => {
      const response = await request(server).get('/games');

      expect(response.type).toEqual('application/json');
    });
    it('should have something in the array', async () => {
      const response = await request(server).get('/games');

      expect(response.body.length).toBeTruthy(); 
    });
  describe('POST/', () => {
    it('should return status 201', async () => {
      const response = await request(server).post('/games')
      .send({title: "MyGame", genre: "action"});

      expect(response.status).toEqual(201); 
    });
    it('should should return status 422 required fields missing', async () => {
      const response = await request(server).post('/games')
      .send({title: "newGame"})

      expect(response.status).toEqual(422); 
    });
    it('should return an integer', async () => {
      const response = await request(server).post('/games')
      .send({title: "newnew", genre: "action"})

      expect(typeof response.body).toBe('number');
    });
    


  });
});

})