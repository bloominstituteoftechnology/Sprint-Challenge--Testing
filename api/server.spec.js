const supertest = require('supertest');
const server = require('./server');

describe('server', () => {
    describe('GET /', () => {

        it('responds with 200 OK', () => {
            supertest(server).get('./').expect(200);
        })

        it('responds with 200 OK', async () => {
            await supertest(server)
            .get('/')
            .expect('Content-Type', /json/i)
        })

    })
})