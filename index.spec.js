const request = require('supertest');

const server = require('./server.js')

describe('server GET requests', () => {
    it('should return status code 200 at "/" endpoint', async () => {
        const response = await request(server).get('/')

        expect(response.status).toBe(200)
    })

    it('should return an array of games at "/games" endpoint', async () => {
        const response = await request(server).get('/games');

        const expectedRes = [
            {   
                id: 1,
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
            },
            {
                id: 2,
                title: 'Digdug', // required
                genre: 'Arcade', // required
                releaseYear: 1984 // not required
            },
            {
                id: 3,
                title: 'Tetris', // required
                genre: 'Arcade', // required
            }
    ]

        expect(response.body).toEqual(expectedRes) 

    })
   
    it('should return an empty array if no games exist from "/games" endpoint',  () => {
        const response =  request(server).get('./games');
        const expectedResponse = []
        expect(response.body).toEqual(expectedResponse)
    })

})

describe('server POST requests', () => {
    test('should return a 422 status code title or genre are excluded from request', async () => {
        const missingTitle = { genre: 'arcade'}
        const response = await request(server).post('/games').send(missingTitle)
  
        expect(response.status).toEqual(422)
    })

    test('should return a 405 status code if title already exists in array', async () => {
        const duplicate = {   
            title: 'Pacman', // required
            genre: 'Arcade', // required
            releaseYear: 1980 // not required
        }

        const response = await request(server).post('/games').send(duplicate)

        expect(response.status).toEqual(405);
    })
    
    test('should return a 201 status code if includes a title and genre and is created', async () => {
        const completeRequest = { title: 'mario', genre: 'arcade'}
        const response = await request(server).post('/games').send(completeRequest)
  
        expect(response.status).toEqual(201)
    })

    test('should return the newly created object in response', async () => {
        const completeRequest = { title: 'mario', genre: 'arcade'}
        const response = await request(server).post('/games').send(completeRequest);
  
        expect(response.body).toHaveProperty('title', 'mario')
        expect(response.body).toHaveProperty('genre', 'arcade')
        expect(response.body).toHaveProperty('id')
    })

    
    
})
