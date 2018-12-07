const request = require('supertest')
const server = require('./server.js')
const db = require('./data/dbConfig.js')
const games = require('./userModel.js')

beforeEach(async () => {
    await db('games').truncate()
})

describe('/ route', () => {
    it('should return status code 200', async () => {
        const response = await request(server).get('/')
        expect(response.status).toBe(200)
    })
    it('should return JSON', async () => {
        const response = await request(server).get('/')
        expect(response.type).toBe('application/json')
    })
    it('should return message: im working ', async () => {
        const body = { message: 'im working' }
        const response = await request(server).get('/')
        expect(response.body).toEqual(body)
    })
})

describe('GET /games route', () => {

    it('should return status code 200', async () => {
        const response = await request(server).get('/games')
        expect(response.status).toBe(200)
    })

    it('should return array', async () => {
        const response = await request(server).get('/games')
        expect(response.body).toEqual([])
    })

    it('should return JSON', async () => {
        const response = await request(server).get('/games')
        expect(response.type).toBe('application/json')
    })

})

describe('POST /games route', () => {

    it('should insert game', async () => {

        let doesExist = await db('games').where({ title: 'Simpsons' })
        expect(doesExist).toHaveLength(0)

        await games.insert({ title: 'Simpsons', genre: 'cool' })
        await games.insert({ title: 'Atari', genre: 'retro' })

        doesExist = await db('games').where({ title: 'Simpsons' })
        expect(doesExist).toHaveLength(1)

        doesExist = await db('games')
        expect(doesExist).toHaveLength(2)
    })

    it('should reject if no title or genre', async () => {

        const response = await request(server)
        .post('/games')
        .send({ title: 'Simpsons' })
        
        expect(response.status).toBe(422)

    })

    it('should receive 201 for succesful game insert', async () => {

        const response = await request(server)
        .post('/games')
        .send({ title: 'Simpsons', genre: 'cool' })

        expect(response.status).toBe(201)

    })

})