const request = require('supertest')
const server = require('./index.js')

describe('server.js', () => {
    describe("get route  ", () => {
        it('should get status 200 on /games route', async () => {
            const response = await request(server).get('/games');
            expect(response.status).toEqual(200)
        })
        it('should return empty array', async () => {
            const response = await request(server).get('/games');
            expect(response.body).toEqual([])
        })
    })
    describe("post route  ", () => {
        it('should get status 200 on /games route', async () => {
            const body = {
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
            }
            const response = await request(server).post('/games').send(body);
            expect(response.status).toEqual(200)
        })
        it('should return status 422 when it is missing data', async () => {

            const response = await request(server).post('/games');
            expect(response.status).toEqual(422)
        })

    })
})