const request = require('supertest')
const db = require('../data/dbConfig.js')
const server = require('../server.js')

beforeEach(() => {
    db('games').truncate()
})

describe('Server test suite', () => {

    describe('post call to api/games', () => {

        it('server should respond with status 422 if game object does not include all values', async () => {
            const response = await request(server)
            .post('/api/games')
            .send({title: 'Asteroids', genre: 'Arcade'})

            expect(response.status).toBe(422)
        })

        it('server should respond with status code 200 if game object returns all values', async () => {
            const response = await request(server)
            .post('/api/games')
            .send({title: 'Crash Bandicoot', genre: 'Undefinable', releaseYear: 1999})
            expect(response.status).toBe(200)
        })
        
        // it('server should respond by sending back and array with the ID of the current item being added', async () => {
            //     const response = await request(server)
            //     .post('/api/games')
            //     .send({title: 'Soandso', genre: 'lorem', releaseYear: 2018})
            
            //     expect(response.body).toEqual([3])
            // })
            

        it('server should respond with a json object', async () => {
            const response = await request(server)
            .post('/api/games')
            .send({title: 'Crash Bandicoot', genre: 'Undefinable', releaseYear: 1999})
            expect(response.type).toBe('application/json')
        })
    })// end describe for post call to api/games

    describe('get call to /api/games/info', () => {

        
    })


})// end describe for Server test suite