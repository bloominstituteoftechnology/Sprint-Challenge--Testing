const request = require('supertest');

const server = require('./server.js');


describe('GET', () => {
    it('should return 200 OK', () => {
        return request(server)
        .get('/') 
        .then(res => {
            expect(res.status).toBe(200)
        })
    })

    it('should return 200 OK using async/await', async () => {
        const res = await request(server).get('/')
        expect(res.status).toBe(200)
})

    it('should return JSON', async () => {
        const res = await request(server).get('/')

        expect(res.type).toBe('application/json')
})

    it('should return {api: running}', async () => {
        const res = await request(server).get('/')

        expect(res.body).toEqual({ api: 'running' })
    })
})