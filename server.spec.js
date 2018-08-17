const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {

describe('server testing for get request', () => {

it('should return status code 200 OK', async() => {
                const expected =200;

                const response = await request(server).get('/');
                expect(response.status).toEqual(expected);

});
});

});
