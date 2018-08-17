const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {

describe('server testing for get request', () => {

it('should return status code 200 OK', async() => {
                const expected =200;

                const response = await request(server).get('/');
                expect(response.status).toEqual(expected);

});

it('should return an Array as a respnse on making a GET request', async() => {
                const expected = true;

                const response = await request(server).get('/');
		console.log( response.body);
                expect(Array.isArray(response.body)).toEqual(expected);

});
});



	


	











});
