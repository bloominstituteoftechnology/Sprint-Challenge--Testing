const request = require('supertest');

const server = require('./server.js');

//TESTS FOR SERVER.JS TO TEST ALL ROUTE FUNCTIONING...
describe('server.js', () => {
    
    //TEST FOR FIRST BASIC ROUTE...
    describe(" BASIC ROUTE '/' ", () => {
        it('should return status code 200', async () => {
             let response = await request(server).get('/');
             expect(response.status).toBe(200);
        })

        it('should return JSON', async () => {
             let response = await request(server).get('/');
             expect(response.type).toBe('application/json');
        });
      
        it('should return with a body like: {message : "SERVER UP"}', async () => {
             let response = await request(server).get('/');
             expect(response.body).toEqual({message : "SERVER UP"});
        });
    });
});