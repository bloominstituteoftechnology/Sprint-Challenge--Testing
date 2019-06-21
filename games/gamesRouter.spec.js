const supertest = require('supertest');
const router = require('./gamesRouter');

describe('games router', () => {
    describe('GET /', () => {

        it('responds with 200 OK', () => {
            supertest(router).get('/').expect(200);
        })

        it('responds with 200 OK', () => {
            supertest(router)
            .get('/')
            .expect('Content-Type', /json/i)
        })
    })


    describe('POST /', () => {
        
        it('responds with 200 OK', () => {
            supertest(router).post('/').expect(200)
        })


    })

})