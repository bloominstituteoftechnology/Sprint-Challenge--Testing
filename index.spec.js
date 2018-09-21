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
   

    // it('should return an empty array if no game exist from "/games" endpoint', async () => {
    //     const response = await request(server).get('./games');

    //     expect(response.body).toEqual([])
    // })

})

describe('server POST requests', () => {
    test('should return a 200 status code if includes a title and genere', async () => {
        const completeRequest = { title: 'frogger', genere: 'arcade'}
        const response = await request(server).post('/games').send(completeRequest)
  
        expect(response.status).toEqual(200)
    })

    test('should return an requested object as response', async () => {
        const completeRequest = { title: 'frogger', genere: 'arcade'}
        const response = await request(server).post('/games').send(completeRequest)
  
        expect(response.body).toEqual(completeRequest)
    })

    test('should return a 422 status code title or genere are excluded from request', async () => {
        const missingTitle = { genere: 'arcade'}
        const response = await request(server).post('/games').send(missingTitle)
  
        expect(response.status).toEqual(422)
    })
    
    
})
