const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

{
    title: 'Ms. Pac Man',
    genre: 'Maze',
    releaseYear: 1982
}

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

        })

        it('sends the correct response', async () => {

        })

        it('sends an empty array if nothing in the database', () => {

        })

    })

    describe('get /:id', () => {

        it('responds with 200', async () => {

        })

        it('sends the correct response', async () => {

        })

        it('responds with status 404 if that id is invalid', async () => {

        })

    })

    describe('post to /', () => {

        it('responds with 201', async () => {

        })

        it('sends the correct response', async () => {

        })

        it('responds with 405 if title is not unique', async () => {

        })

        it('responds with 422 if missing title', async () => {

        })

        it('responds with 422 if missing genre', async () => {

        })

    })

    describe('delete /:id', () => {

        it('responds with 200', async () => {

        })

        it('sends the correct response', async () => {

        })

        it('responds with 404 if the title is invalid', async () => {

        }

    })

})