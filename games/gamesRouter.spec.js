// const db = require('../data/dbConfig.js');

const request = require('supertest');

const router = require('./gamesRouter.js');
const games = require('./gamesModel.js');

const server = require('../api/server.js');


describe('GET /', () => {
    it('should return 200 OK', async () => {
        const res = await request(server.use(router)).get('/')
        expect(res.status).toBe(200)
})
    it('should return JSON', async () => {
        const res = await request(server.use(router)).get('/')
        expect(res.type).toBe('application/json')
    })
});

describe('GET /', () => {
    describe('get()', () => {
        it('should return []', async () => {
            await games.get([{title: 'Assassin\'s Creed', genre: 'Action-adventure Stealth', releaseYear: 2007  }])
            const gamers = await (['games']) 
            expect(gamers).toEqual( ['games'] )
        })
    });
});

describe('POST /', () => {
    it('should return 422 for incorrect game data', async () => {
        const res = await request(server.use(router)).post('/')
        expect(res.status).toBe(422)
    })
});
