const gamesDb = require('./gamesModel.js')
const db = require('../data/dbConfig.js');
const server = require('../api/server.js')
const request = require('supertest')
describe('games model', () =>{

    
    describe('/POST insert()', () =>{
        afterEach(async () =>{
            await db('games').truncate()
        })

        it('should insert the provided games into the db 201 Status', async()=>{
            await gamesDb.insert({ title: 'newGame', genre: 'Family', releaseYear: '2000'})
            await gamesDb.insert({ title: 'newGame2', genre: 'Cut-Throat', releaseYear: '2001'})
            const games = await db('games')
            expect(games[0].title).toBe('newGame')
            expect(games).toHaveLength(2)
            expect(201)

        })

        it('should insert the right game', async()=>{
            await gamesDb.insert({ title: 'NewGameToday', genre: 'Family', releaseYear: '2006' });
            const games = await db('games')
            expect(games[0].title).toBe('NewGameToday')

        })

        it('if content is missing, respond with 422', () => {
            return request(server)
            .post('/games')
            .send({
                title: 'Chess', 
            })
            .expect(422)
        })
    })
})