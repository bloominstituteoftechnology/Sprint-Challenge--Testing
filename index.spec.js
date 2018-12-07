const server = require('./api/server.js')
const request = require('supertest')
const db = require('./data/db.js')

beforeEach(async () => {
    await db('games').truncate();
});

describe('games database', () => {
    describe('get req to /', () => {
        it('should return status code 200', async () => {
            let res = await request(server).get('/')
            expect(res.status).toBe(200)
        })
    })
    describe('post req to /games', () => {
        it('should return status code 201 for complete game data', async () => {
            let res = await request(server)
                .post('/games')
                .send({ title: 'Red Dead Redemption 2', genre: 'Action-Adventure', releaseYear: 2018 })
            expect(res.status).toBe(201)
        })
        it('should return status code 422 for incomplete game data', async () => {
            let res = await request(server)
                .post('/games')
                .send({ title: 'Witcher 3' })
            expect(res.status).toBe(422)
        })
        it('should return json', async () => {
            let res = await request(server)
                .post('/games')
                .send({ title: 'Red Dead Redemption', genre: 'Action-Adventure', releaseYear: 2010 })
            expect(res.type).toBe('application/json')
        })
    })
    describe('get req to /games', () => {
        it('should return status code 200', async () => {
            let res = await request(server).get('/games')
            expect(res.status).toBe(200)
        })
        it('should return an empty array without game data', async () => {
            let res = await request(server).get('/games')
            expect(res.body).toEqual([])
        })
        it('should return an array of games with data', async () => {
            await request(server)
                .post('/games')
                .send({ title: 'Red Dead Redemption 2', genre: 'Action-Adventure', releaseYear: 2018 })
            let res = await request(server).get('/games')
            expect(res.body).toEqual([{ "genre": "Action-Adventure", "id": 1, "releaseYear": 2018, "title": "Red Dead Redemption 2" }])
        })
    })
})