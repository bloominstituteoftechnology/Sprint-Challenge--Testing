const request = require('supertest');
const server = require('./server.js'); 

describe('BASIC TEST IS RUNNING TEST', () => {
    it('runs the tests', () => {
        expect(true).toBeTruthy();
    })

})

describe('GET', () => {
    it.skip('should return a status code of 200 after getting users', async () => {
        const response = await request(server).get('/users');
            
        expect(response.status).toEqual(200); 
    })
})




