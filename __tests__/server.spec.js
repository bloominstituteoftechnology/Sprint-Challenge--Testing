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

    describe('GET /games', async () => {
        it('returns a status code of 200', async () => {
            const expected = 201
            const response = await request(server).get('/games')

            expect(response.status).toEqual(expected)
        })

        it('returns an array', async () => {
            const response = await request(server).get('/games')

            expect(response.type).arrayContaining([])
        })

        it('If there is at least one game, check that it contains a title', async () => {
            const response = await request(server).get('/games')
            const games = response.body

            if(games.length > 0){
                expect(games[0].title).anything()
            }
            else(
                expect(response.type).arrayContaining([])
            )
        })
    })
})