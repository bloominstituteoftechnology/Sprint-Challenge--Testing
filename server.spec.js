const request = require('supertest');
const server = require('./server.js');

describe('server.js', ()=> {
    describe('/', ()=> {
        it('should return a 200 status code', ()=> {
            let response;
            const expectedCode = 200;
            return request(server).get('/').then(res=> {
                response = res;
                expect(response.status).toEqual(expectedCode);
            })
        });

        it('should return a JSON object fron the index route', async () => {
            const expectedBody = { message: "Hi :)" };
      
            const response = await request(server).get('/');
      
            expect(response.body).toEqual(expectedBody);
        });

    });
});
