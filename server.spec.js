const request = require('supertest')
const server = require('./server.js')
const db = require('./data/dbConfig.js')

describe('/ route', () => {
    it('should return status code 200', async () => {
        const response = await request(server).get('/')
        expect(response.status).toBe(200)
    })
    it('should return JSON', async () => {
        const response = await request(server).get('/')
        expect(response.type).toBe('application/json')
    })
    it('should return message: im working ', async () => {
        const body = { message: 'im working' }
        const response = await request(server).get('/')
        expect(response.body).toEqual(body)
    })
})