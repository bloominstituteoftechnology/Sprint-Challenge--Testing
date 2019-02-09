const games = require('./gamesModel');
const db = require('../data/dbConfig');

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
        await db.migrate.rollback()
    })


    it('should fetch the games', async () => {
        const games = await games.fetch()

        expect(games.length).toBe(5)
    })

    it('should fetch a game by id', async () => {
        const game = await games.fetch(1)

        expect(game.name).toBe('Asteroids')
    })

    it('should add a new game', async () => {
        const game = await games.insert({
            title: 'Ms. Pac Man',
            genre: 'Maze',
            releaseYear: 1982
        })

        expect(game.id).toBe(6)
    })

    it('should delete an existing game by id', async () => {
        const deleted = await games.remove(5)

        expect(deleted).toBe(5)
    })

})