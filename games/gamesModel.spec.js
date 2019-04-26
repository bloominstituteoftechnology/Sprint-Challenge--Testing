const db = require('../data/dbConfig.js');

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
            expect(games).toHaveLength(4)
        })
    });
});