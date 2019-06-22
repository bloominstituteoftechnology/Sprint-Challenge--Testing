const db = require('../data/dbConfig');

const { insert, get } = require('./gamesModel');

describe('games model', () => {
    beforeEach(async () => {
        await db('games').truncate();
    })

    it('should set environment to development', () => {
        expect(process.env.DB_ENV).toBe('development');
    });

    describe('get()', async () => {
        it('should return all games', async () => {
            await insert({ title: 'Street Fighter', genre: 'Action', releaseYear: '1997' })

            const games = await get();

            expect(games).toHaveLength(1)
        })

        it('should return empty array', async () => {
            
            const games = await db('games');

            expect(games).toEqual([]);
        })
    })

    describe('insert()', () => {
        it('should insert the provided animal', async () => {
            
            await insert({ title: 'Street Fighter', genre: 'Action', releaseYear: '1997' })
        
            const games = await db('games');

            expect(games).toHaveLength(1);

        })

        it('should return empty array', async () => {
            
            const games = await db('games');

            expect(games).toEqual([]);
        })
    })


});