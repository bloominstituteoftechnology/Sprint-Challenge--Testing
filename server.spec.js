const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
    it('runs the tests', () => {
        expect(true).toBeTruthy();
    });

    describe('GET /', () => {
        it('returns 200 status code', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toEqual(200)
        });

        it('should return empty object', async () => {
            const expectedBody = {};
            const response = await request(server).get('/games');
            expect(response.body).toEqual(expectedBody)
        });  

        it('should return JSON', async () => {            
            const response = await request(server).get('/games');
            expect(response.type).toEqual('application/json')
        });       
    });

    describe('POST /', () => {
        it('should return error message', async () => {
            const expectedBody = { "message": "Need input and title" };
            const response = await request(server).post('/games');
            expect(response.body).toEqual(expectedBody)
        });
        it('should return error status', async () => {            
            const response = await request(server).post('/games').send({title: 'WoW'});
            expect(response.status).toEqual(422)
        });
        it('should return {title: "WoW", genre:"MMO"}', async () => {
            const expectedBody = {title: 'WoW', genre:'MMO'};
            const response = await request(server).post('/games').send({title: 'WoW', genre:'MMO'});
            expect(response.body).toEqual(expectedBody)
        });
    });
});