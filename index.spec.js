const request = require('supertest');

const server = require('./server.js')

describe('server GET requests', () => {
    it('should return status code 200 at "/" endpoint', async () => {
        const response = await request(server).get('/')

        expect(response.status).toBe(200)
    })

    it('should return an array of games at "/games" endpoint', async () => {
        const response = await request(server).get('/games');

        const expectedRes = [{
            title: 'Pacman', // required
            genre: 'Arcade', // required
            releaseYear: 1980 // not required
        },
        {
            title: 'Digdug', // required
            genre: 'Arcade', // required
            releaseYear: 1984 // not required
        },
        {
            title: 'Tetris', // required
            genre: 'Arcade', // required
        }]

        expect(response.body).toEqual(expectedRes) 

    })
   

    it('should return an empty array if no game exist from "/games" endpoint', async () => {
        const response = await request(server).get('./games');

        expect(response.body).toEqual([])
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
