const request = require('supertest');

const server = require('./server.js');


describe ('GET request for /', () => {
    it('returns a 200 status code', async () => {
        //get access to the server
        //use supertest to run a get request to server
        const response = await request(server).get('/');

        expect(response.status).toEqual(200);
    });
    it('returns {api: "running"}', async () => {
        const expectedBody = { api: 'running'}
        const response = await request(server).get('/');
        
        expect(response.body).toEqual(expectedBody);
    });
});


