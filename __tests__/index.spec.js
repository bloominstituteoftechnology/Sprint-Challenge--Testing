const request = require('supertest')
const db = require('../data/dbConfig.js')
const server = require('../server.js')

beforeEach(async () => {
    await db('games').truncate()
})


describe('Server test suite', () => {

    describe('post call to api/games', () => {

        it('server should respond with status 422 if game object does not include all values', async () => {
            const response = await request(server)
            .post('/api/games')
            .send({title: 'Asteroids', genre: 'Arcade'})

            expect(response.status).toBe(422)
        })

        it('server should respond with status code 201 if game object returns all values', async () => {
            const response = await request(server)
            .post('/api/games')
            .send({title: 'Crash Bandicoot', genre: 'Undefinable', releaseYear: 1999})
            expect(response.status).toBe(201)
        })
        
        it('server should respond by sending back an array with the ID of the current item being added', async () => {
                const response = await request(server)
                .post('/api/games')
                .send({title: 'Soandso', genre: 'lorem', releaseYear: 2018})
            
                expect(response.body).toEqual([1])
            })
            

        it('server should respond with a json object', async () => {
            const response = await request(server)
            .post('/api/games')
            .send({title: 'Asteroids', genre: 'Arcade', releaseYear: 1982})
            expect(response.type).toBe('application/json')
        })



        it('server should respond with 405 if games object with that title is already in database', async () => {
            const response1 = await request(server)
            .post('/api/games')
            .send({title: 'Asteroids', genre: 'Arcade', releaseYear: 1982})
            expect(response1.status).toBe(201)

            const response2 = await request(server)
            .post('/api/games')
            .send({title: 'Asteroids', genre: 'Arcade', releaseYear: 1982})
            expect(response2.status).toBe(405)
        })

    })// end describe for post call to api/games


    describe('get call to /api/games/info', () => {

        it('server should respond with status code 200', async () => {
            const response = await request(server)
            .get('/api/games/info')
            expect(response.status).toBe(200)
        })

        it('server should respond with type json', async () => {
            const response = await request(server)
            .get('/api/games/info')
            expect(response.type).toBe('application/json')
        })

        it('server should respond with an array', async () => {
            await db('games')
            .insert({title: 'Donkey Kong', genre: 'Arcade', releaseYear: 1982})

            const response = await request(server)
            .get('/api/games/info')
            expect(Array.isArray(response.body)).toBe(true)
        })
    })// end describe for get call to api/games/info

    describe('delete call to /api/games/:id', () => {

        it('server should respond with status code 200 when deleting by id', async () => {
            await db('games')
            .insert({title: 'Donkey Kong', genre: 'Arcade', releaseYear: 1982})

            const response = await request(server)
            .delete('/api/games/1')
            expect(response.status).toBe(200)
        })

        it('server should respond with status code 404 if id specified is not in DB', async () => {
            await db('games')
            .insert({title: 'Donkey Kong', genre: 'Arcade', releaseYear: 1982})

            const response = await request(server)
            .delete('/api/games/2')
            expect(response.status).toBe(404)
        })

        it('server should respond with the id of the item you deleted as a typeof number', async () => {
            await db('games')
            .insert({title: 'Donkey Kong', genre: 'Arcade', releaseYear: 1982})

            const response = await request(server)
            .delete('/api/games/1')
            expect(typeof response.body).toBe('number')
        })
    })// end describe for get call to api/games/:id

})// end describe for Server test suite