const request = require('supertest')

const server = require('../server.js')

describe('server.js', () => {
    describe('root endpoint GET (/)', () => {
        it('should return a status code of 200', async () => {
            const expected = 200
            const response = await request(server).get('/')
            expect(response.status).toEqual(expected)
        })

        it('should return JSON', async () => {
            const expected = 'application/json'
            const response = await request(server).get('/')
            expect(response.type).toEqual(expected)
        })
        
        it('should return { "message" : "App running" }', async () => {
            const expected = { "message": "App running" }
            const response = await request(server).get('/')
            expect(response.body).toEqual(expected)
        })
    })

    describe('GET /games', () => {
        it('returns a status code of 200', async () => {
            const expected = 200
            const response = await request(server).get('/games')

            expect(response.status).toEqual(expected)
        })

        it('returns an array', async () => {
            const expected = []
            const response = await request(server).get('/games')

            expect(response.type).toEqual(expect.arrayContaining(expected))
        })

        it('If there is at least one game, check that it contains a title', async () => {
            const expected = []
            const response = await request(server).get('/games')
            const games = response.body

            if(games.length > 0){
                expect(games[0].title).toEqual(expect.anything())
            }
            else(
                expect(response.type).toEqual(expect.arrayContaining(expected))
            )
        })

        it('If there is at least one game, check that it contains a genre', async () => {
            const expected = []
            const response = await request(server).get('/games')
            const games = response.body

            if(games.length > 0){
                expect(games[0].genre).toEqual(expect.anything())
            }
            else(
                expect(response.type).toEqual(expect.arrayContaining(expected))
            )
        })
    })

    describe('POST /games', () => {
        it('should return JSON', async () => {
            const expected = 'application/json'
            const response = await request(server).post('/games')
            expect(response.type).toEqual(expected)
        })

        it('should return 422 when no information is sent', async () => {
            const expected = 422
            const response = await request(server).post('/games')
            expect(response.status).toEqual(expected)
        })

        it('should return an error message when no title is sent', async () => {
            const expected = { message: "Please include a valid title and genre" }

            const noTitle = { genre: "first person shooter" }

            const response = await request(server).post('/games').send(noTitle)
            expect(response.body).toEqual(expected)
        })

        it('should return an error message when no genre is sent', async () => {
            const expected = { message: "Please include a valid title and genre" }

            const noGenre = { title: "Doom" }

            const response = await request(server).post('/games').send(noGenre)
            expect(response.body).toEqual(expected)
        })

        it('should return the added game if successful', async () => {
            const newGame = { title: "Doom",
                            genre: "first person shooter" }

            const response = await request(server).post('/games').send(newGame)
            expect(response.body).toEqual(expect.objectContaining(newGame))
        })

    })
})