const server = require('./index.js')
const request = require('supertest');

describe('index.js', () => {
    describe('post', () => {
        it('should return status code 422 w/ faulty info', async () => {
            let response = await request(server)
            .post('/games')
            .send({genre: 'Arcade', releaseYear: 1980})
            expect(response.status).toBe(422);
            
        })

        it('should return status code 201 w/ correct info', async () => {
            let response = await request(server)
            .post('/games')
            .send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980})
            expect(response.status).toBe(201);
        })
    })

    describe('get', () => {
        it('should return status code 200', async () => {
            let response = await request(server)
            .get('/games')
            expect(response.status).toBe(200);
        })

        it('should always return an array', async () => {
            let response = await request(server)
            .get('/games')
            expect(Array.isArray(response.body)).toBe(true)
        })
    })
})