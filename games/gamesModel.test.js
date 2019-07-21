const request = require('supertest');
const server = require('../api/server.js');

const db = require('../data/dbConfig.js');
const Games = require('./gamesModel.js');

describe('the games model', () => {
    describe('insert()', () => {
        afterEach(async () => {
           await db('games').truncate(); //clean up
        });

        it('should insert games into the db', async () => {
            await db('games').truncate();
            await Games.insert([
                { id: 1, title: "GTA V", genre: "Action-adventure", releaseYear: 2013 },
                { id: 2, title: "Super Mario Bros", genre: "Action-adventure", releaseYear: 1983 }
            ]);

            const games = await db('games');

            expect(games).toHaveLength(2);
            expect(games[0].title).toBe('GTA V');
        });

        it('should return a status code of 201', async () => {
            let response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
    
            expect(response.status).toBe(201);
        });

        it('should return the new game on insert', async () => {
            const game = await Games.insert({ title: "Super Mario Bros", genre: "Action-adventure", releaseYear: 1983 });

            expect(game).toEqual({ id: 2, title: "Super Mario Bros", genre: "Action-adventure", releaseYear: 1983 });
        });

        it('should return a `422` status code if title/genre are not included', async () => {
            let response = await request(server).post('/games').send({ releaseYear: 1980 });
    
            expect(response.status).toBe(422);
        });

        xit('should return a `405` status code if a duplicate game', async () => {

            await Games.insert({ title: "GTA V", genre: "Action-adventure", releaseYear: 2013 });

            let response = await request(server).post('/games').send({ title: "GTA V", genre: "Action-adventure", releaseYear: 2013 });

            expect(response.status).toBe(405);
        });
    });

    describe('getById()', () => {
        // cleanup for db
        afterEach(async () => {
            await db('games').truncate(); //clean up
        });

        it('finds a game by id', async () => {
            await db('games').insert([
                { id: 1, title: "GTA V", genre: "Action-adventure", releaseYear: 2013 },
                { id: 2, title: "Super Mario Bros", genre: "Action-adventure", releaseYear: 1983 }
            ]);

            const game = await Games.getById(2);

            expect(game.title).toEqual("Super Mario Bros");
        });

        it('returns undefined of invalid id', async () => {
            const game = await Games.getById(2);

            expect(game).toBeUndefined();
        });
    });
});