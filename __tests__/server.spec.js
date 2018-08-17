const request = require('supertest')

const server = require('../server.js')

describe('server.js', () => {
    describe('root endpoint GET (/)', () => {
        it('should return a status code of 200', async () => {
            const expected = 200
            const response = await request(server).get('/')
            expect(response.status).toEqual(expected)
        })

        it('should return JSON', async () => {
            const expected = 'application/json'
            const response = await request(server).get('/')
            expect(response.type).toEqual(expected)
        })
        
        it('should return { "message" : "App running" }', async () => {
            const expected = { "message": "App running" }
            const response = await request(server).get('/')
            expect(response.body).toEqual(expected)
        })
        
    })
})