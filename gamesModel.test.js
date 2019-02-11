const games = require('./gamesModel.js')

const db = require('./dbConfig.js')

describe('games helper methods', () => {
    afterEach(async () => {
        await db('GAMES_TEST').truncate();
    })


    it('adds a game', async () => {
        const ids = await games.add({title: 'Tetris', genre: 'arcade', releaseYear: 1984})
        console.log(ids)
        expect(ids.length).toBe(1);
        expect(ids[0]).toBe(1);

    })
})