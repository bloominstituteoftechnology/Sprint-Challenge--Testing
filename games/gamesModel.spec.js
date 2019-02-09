const games = require('./gamesModel.js');
const db = require('../data/dbConfig.js');

describe('the games model', () => {
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
        await db('games').truncate();
    });

    it('Should get all games', async() => {
        const games = await games.fetch()
        expect(games.length).toBe(3)
    })

    it('Should fetch an individual game by ID', async () => {
        const game = await games.fetch(3)

        expect(game.name).toBe('Risk')
    })

    it('Should insert a new game', async ()=> {
        const game = await games.insert({
            name: 'Axis and Allies 2',
            genre: 'Board',
            releaseYear: 1999
        });

        expect(game.id).toBe(4);
    });

    it('Should delete existing game by ID', async () => {
        const deleteGame = await games.remove(3)
        expect(deleteGame).toBe(3)
    })
})