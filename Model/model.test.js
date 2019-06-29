const Games = require('./model');
const db = require('../data/dbConfig');

beforeEach(() => {
    return db('games').truncate();
});

describe('GAMES', () => {
    describe('getAll()', () => {
        it('should return an empty array if no games in database', async () => {
            const games = await Games.getAll();

            expect(games).toEqual([]);
        });

        it('should return an array of games in database', async () => {
            const gamesArr = [
                { title: 'Fire Emblem', genre: 'RPG', releaseYear: 1996 },
                { title: 'Spyro', genre: 'platformer', releaseYear: 1998 }
            ];

            await Games.insert(gamesArr);

            const games = await Games.getAll();

            gamesArr[0].id = 1;
            gamesArr[1].id = 2;
            
            expect(games.length).toBe(2);
            expect(games).toEqual(gamesArr);
        });
    });

    describe('insert()', () => {
        it('should assign an id to inserted game', async () => {
            await Games.insert({ title: 'Spyro', genre: 'platformer', releaseYear: 1998 });

            const games = await Games.getAll();

            expect(games[0].id).toBe(0);
        });

        it('should insert a game into the database', async () => {
            await Games.insert({ title: 'Spyro', genre: 'platformer', releaseYear: 1998 });

            const games = await Games.getAll();

            expect(games.length).toBe(1);
            expect(games[0].title).toBe('Spyro');
        });
    });
});