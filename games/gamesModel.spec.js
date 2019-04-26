const db = require('../data/dbConfig.js');

const request = require('supertest');
const server = require('../api/server.js');
const router = require('./gamesRouter.js');

const Games = require('./gamesModel.js');

describe('games model', () => {
    describe('insert()', () => {
        beforeEach(async () => {
            await db('games').truncate()
        })
        it('should insert the provided games into the db', async () => {
            await Games.insert({ title: 'Battlefield', genre: 'First-person Shooter', releaseYear: 2002  })
            await Games.insert({ title: 'Grand Theft Auto', genre: 'Action-adventure', releaseYear: 1997 })
            await Games.insert({ title: 'Fortnite', genre: 'Survival, battle royale', releaseYear: 2017 })
            await Games.insert({ title: 'Assassin\'s Creed', genre: 'Action-adventure Stealth', releaseYear: 2007 })

            const games = await db('games')
            expect(games).toHaveLength(4)
        })
        it('should return 422', async () => {
            await Games.insert({  title: 'Grand Theft Auto', genre: 'Action-adventure', releaseYear: 1997 })
            
            const game = await db('games')
            expect (game).toHaveLength(1)
            const res = await request(server.use(router)).post('/')
            expect(res.status).toBe(422)
        })
    });
});

describe('game model', () => {
    describe('add()', () => {
        beforeEach(async () => {
            await db('games').truncate()
        })
        it('should not insert the provided games into the db without the require data', async () => {
            await Games.insert({ title: 'Assassin\'s Creed', genre: 'Action-adventure Stealth', releaseYear: 2007 })
            await Games.insert({ title: 'Fortnite', genre: 'Survival, battle royale', releaseYear: 2017 })

            const gamer = await db('games')
            expect(gamer).toHaveLength(2)
        })
    });
});

describe('games model', () => {
    describe('remove()', () => {
        beforeEach(async () => {
            await db('games')
        })
        it('should remove the provided games from the db', async () => {
            await Games.remove({ title: 'Battlefield', genre: 'First-person Shooter', releaseYear: 2002 })
            await Games.remove({ title: 'Grand Theft Auto', genre: 'Action-adventure', releaseYear: 1997 })

            const games = await db('games')
            expect(games).toHaveLength(2)
        })
    });
});