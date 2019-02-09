//Testing Arcade Model request

const games = require('./arcade')
const db = require('../dbConfig')


describe('Arcade Model Testing', () => {

    afterEach(async () => {
        await db('games').truncate();
        await db.seed.run();
    });

    it('should insert a new game', async () => {
        const ids = await games.insert(
            {
                title: ' Asteroids',
                genre: 'Arcade',
                releaseDate: '1978'
            }
        )
        expect(ids.length).toBe(1);
    })



})