const request = require('supertest');
const server = require('../api/server.js');

const db = require('../data/dbConfig.js');
const Games = require('./gamesModel.js');

describe('the games model', () => {
    describe('insert()', () => {
        // cleanup for db
        afterEach(async () => {
           await db('games').truncate();
        });

        it('should insert games into the db', async () => {
            await db('games').truncate();
            await Games.insert([
                { id: 1, title: "Agricola", genre: "board game", releaseYear: 2007 },
                { id: 2, title: "The Legend of Zelda", genre: "Action-adventure", releaseYear: 1986 }
            ]);

            const games = await db('games');

            expect(games).toHaveLength(2);
            expect(games[0].title).toBe('Agricola');
        });

        it('should return a status code of 201', async () => {
            let response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
    
            expect(response.status).toBe(201);
        });

        it('should return the new game on insert', async () => {
            const game = await Games.insert({ title: "The Legend of Zelda", genre: "Action-adventure", releaseYear: 1986 });

            expect(game).toEqual({ id: 1, title: "The Legend of Zelda", genre: "Action-adventure", releaseYear: 1986 });
        });

        it('should return a `422` status code if title and/or genre are not included inside the body', async () => {
            let response = await request(server).post('/games').send({ releaseYear: 1980 });
    
            expect(response.status).toBe(422);
        });

        xit('should return a `405` status code, if client tries to create a duplicate game', async () => {

            await Games.insert({ title: "Agricola", genre: "board game", releaseYear: 2007 });

            let response = await request(server).post('/games').send({ title: "Agricola", genre: "board game", releaseYear: 2007 });

            expect(response.status).toBe(405);
        });
    });

    describe('getById()', () => {
        // cleanup for db
        afterEach(async () => {
            await db('games').truncate();
        });

        it('finds a game by id', async () => {
            await db('games').insert([
                { id: 1, title: "Agricola", genre: "board game", releaseYear: 2007 },
                { id: 2, title: "The Legend of Zelda", genre: "Action-adventure", releaseYear: 1986 }
            ]);

            const game = await Games.getById(2);

            expect(game.title).toEqual("The Legend of Zelda");
        });

        it('returns undefined of invalid id', async () => {
            const game = await Games.getById(2);

            expect(game).toBeUndefined();
        });
    });
});