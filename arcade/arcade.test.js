//Testing Arcade Model request

const games = require('./arcade')
const db = require('../dbConfig')


describe('Arcade Model Testing', () => {

    beforeEach(async () => {
        await db('games').truncate()
        await db.seed.run()

    });

    afterEach(async () => {
        await db('games').truncate();
        await db.seed.run();
    });

    it('should get all games', async () => {
        const list = await games.getAll();

        expect(list.length).toBe(1);
    })

    it('should get game by id', async () => {
        const id = await games.getById(1);
        expect(id.title).toBe('Pacman')
    })

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