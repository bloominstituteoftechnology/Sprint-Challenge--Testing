const server = require('../index')
const request = require('supertest')

describe('Index Route', () => {
    it ('should check if the server is running', async () => {
        const res = await request(server).get('/')

        expect(res.status).toBe(200)
        expect(res.body.status).toBe(true)
    })
})

describe('Games Route', () => {
    describe('GET /api/games', () => {
        it ('should check for respose', async () => {
            const res = await request(server).get('/api/games')
            expect(res.status).toBe(200)
        })

        it ('should check for games in response', async () => {
            const res = await request(server).get('/api/games')
            expect(res.body.status).toBe(true)
            expect(typeof res.body.games).toBe('object')
        })
    })
})