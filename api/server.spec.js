const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

describe('the route handlers', () => {

    beforeEach( () => {
        return db.migrate.rollback()
            .then( () => {
                return db.migrate.latest()
                    .then( () => {
                        return db.seed.run()
                    })
            })
    })

    afterEach(async () => {
        await db.migrate.rollback()
    })


    describe('get /', () => {

        it('responds with status 200', async () => {
            const success = await request(server).get('/')

            expect(success.status).toBe(200)
        })

        it('sends the correct response', async () => {
            const success = await request(server).get('/')

            expect(success.body.length).toBe(5)
        })

        it('sends an empty array if nothing in the database', () => {
            db.migrate.rollback();
            const success = await request(server).get('/')

            expect(success.body).toEqual([])
        })
    })

    describe('get /:id', () => {

        it('responds with 200', async () => {
            const success = await request(server).get('/3')

            expect(success.status).toBe(200)
        })

        it('sends the correct response', async () => {
            const success = await request(server).get('/3')

            expect(success.body.id).toEqual(3)
            expect(success.body.title).toEqual('Donkey Kong')
            expect(success.body.genre).toEqual('Platform')
            expect(success.body.releaseYear).toEqual(1981)
        })

        it('responds with status 404 if that id is invalid', async () => {
            const success = await request(server).get('/44')

            expect(success.status).toBe(404)
        })

    })


    describe('post to /', () => {

        it('responds with 201', async () => {
            const newGame = {
                title: 'Ms. Pac Man',
                genre: 'Maze',
                releaseYear: 1982
            }
            const success = await request(server).post('/').send(newGame)

            expect(success.status).toBe(201)
        })

        it('sends the correct response', async () => {
            const newGame = {
                title: 'Ms. Pac Man',
                genre: 'Maze',
                releaseYear: 1982
            }
            const success = await request(server).post('/').send(newGame)

            expect(success.body.title).toBe('Ms. Pac Man')
            expect(success.body.genre).toBe('Maze')
            expect(success.body.releaseYear).toBe(1982)
        })

        it('responds with 405 if title is not unique', async () => {
            const newGame = {
                title: 'Monkey Island',
                genre: 'Adventure',
                releaseYear: 1990
            }
            const fail = await request(server).post('/').send(newGame)

            expect(fail.status).toBe(405)
        })

        it('responds with 422 if missing title', async () => {
            const newGame = {
                genre: 'Shooter'
            }
            const fail = await request(server).post('/').send(newGame)

            expect(fail.status).toBe(422)
        })

        it('responds with 422 if missing genre', async () => {
            const newGame = {
                title: 'Galaga',
                releaseYear: 1979
            }
            const fail = await request(server).post('/').send(newGame)

            expect(fail.status).toBe(422)
        })
    })


    describe('delete /:id', () => {

        it('responds with 200', async () => {
            const success = await request(server).delete('/1')

            expect(response.status).toBe(200)
        })

        it('sends the correct response', async () => {
            const success = await request(server).delete('/1')

            expect(success.body.id).toEqual(1)
            expect(success.body.title).toEqual('Asteroids')
            expect(success.body.genre).toEqual('Shooter')
            expect(success.body.releaseYear).toEqual(1979)
        })

        it('responds with 404 if the title is invalid', async () => {
            const fail = await request(server).delete('/22')

            expect(fail.status).toBe(404)
        })
    })

})