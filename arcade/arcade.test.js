//Testing Arcade Model request

const games = require('./arcade')
const db = require('../dbConfig')


describe('Model - Arcade Testing', () => {
//Before Each allows you to make sure you have cleanup before each test run
    beforeEach(async () => {
        await db('games').truncate()
        await db.seed.run()

    });
//After each should cleanup after each test has ran
    afterEach(async () => {
        await db('games').truncate();
        await db.seed.run();
    });

    //Validates that it returns all the games
    it('should get all games', async () => {
        const list = await games.getAll();

        expect(list.length).toBe(1);
    })
//Validates that you can get a game by Id
    it('should get game by id', async () => {
        const id = await games.getById(1);
        expect(id.title).toBe('Pacman')
    })
//Validates that you can insert a new game
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

//Validates that you can delete a game
    it('should delete a game', async () => {
        const response = await games.delete(1)
        expect(response).toBe(1)
    })

})