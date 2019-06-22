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

        it('responds with 500 ERROR', () => {
            supertest(router).get('/1').expect(500);
        })

        
    })


    describe('POST /', () => {

        it('responds with 200 OK', () => {
            supertest(router).post('/').expect(200);
        })

        // it('responds with 200 success', async () => {
        //     const data = {
        //         title: 'Street Fighter', 
        //         genre: 'Action', 
        //         releaseYear: '1997'
        //     }

        //     const response = await supertest(router)
        //     .post('/games')
        //     .send(data)

        //     expect(response.status).toEqual(200)
        // })

        it('responds with 200 OK', () => {
            supertest(router)
            .post('/')
            .expect('Content-Type', /json/i)
        })

        it('responds with 500 ERROR', () => {
            supertest(router).post('/1').expect(500)
        })
    })

})