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
    it('should return []', async () => {
       await games.get([{title: 'Assassin\'s Creed', genre: 'Action-adventure Stealth', releaseYear: 2007  }])
       const gamers = await debug('games') 
       expect(res.type).toEqual( [] )
    })
});

