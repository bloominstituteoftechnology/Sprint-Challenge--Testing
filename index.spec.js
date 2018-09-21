const request = require('supertest');

const server = require('./server.js')

describe('server GET requests', () => {
    it('should return status code 200 at "/" endpoint', async () => {
        const response = await request(server).get('/')

        expect(response.status).toBe(200)
    })

    it('should return list of games at "/games" endpoint', () => {

    })

    it('should return an empty array if no game exist from "/games" endpoint', () => {

    })

})

describe('server POST requests', () => {
    test('should return a 200 status code if includes a title and genere', () => {
      
    })

    test('should return a 422 status code title or genere are excluded from request', () => {
      
    })
    
    test('should return a 422 status code title or genere are excluded from request', () => {
      
    })
    
})
