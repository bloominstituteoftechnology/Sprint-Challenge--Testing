const request = require('supertest');

const server = require('../index')

describe('Post game to /', () => {
    it('should add game to games array and return game', async () => {
        const expected = {
            title: 'Earthworm Jim',
            genre: 'Action'
        }

        const response = await request(server)
            .post('/')
            .send({
                title: 'Earthworm Jim',
                genre: 'Action'
            })

            expect(response.body).toEqual(expected)
    })
})


describe('Get endpoint should retrieve games array with status code 200', () => {
    it('should get games array and return status code 200', async () => {
        const response = await request(server).get('/')
        expect(response.status).toEqual(200);
    })

    it('should return JSON', async () => {
        const response = await request(server).get('/')

        expect(response.type).toEqual('application/json')

    })
})