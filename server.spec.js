const request=require('supertest');
const server=require('./server');

describe('server.js',()=>{
    describe('games route',()=>{
        it('should return a 200 status code',async()=>{
            const expectedStatusCode=200;
            response=await request(server).get('/games');
            expect(response.status).toEqual(expectedStatusCode);
        })
        it('should return a JSON object from the games route',async()=>{
            const response=await request(server).get('/games');
            expect(response.type).toEqual('application/json');
        })
        it('should return an array',async()=>{
            const expectedBody={games:[]};
            const response=await (request(server)).get('/games');
            expect(response.body).toEqual(expectedBody);
        })
    })
})