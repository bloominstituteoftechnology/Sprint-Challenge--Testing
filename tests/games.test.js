const server = require('../index')
const request = require('supertest')

describe('Index Route', () => {
    it ('should check if the server is running', async () => {
        const res = await request(server).get('/')

        expect(res.status).toBe(200)
        expect(res.body.status).toBe(true)
    })
})