const server = require('./server.js');
const req = require('supertest');

describe('server', () => {
    it('Sanity check.', async () => {
        const res = await req(server).get('/');
        expect(res.status).toBe(200);
        expect(res.type).toBe('application/json');
        expect(res.body).toEqual({sanity:'checked'});
    });

    describe('POST /games', () => {
        it('Should POST game object to API.', async () => {
            const gameObject = {
                title: 'Pacman',
                genre: 'Arcade',
                releaseYear: 1980
            }
            const res = await req(server).post('/games')
                .send(gameObject);
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
            expect(res.body).toEqual(
                {
                    title: gameObject.title,
                    genre: gameObject.genre,
                    year: gameObject.releaseYear
                }
            );
        });
        it('Should 422 if faulty game object sent.', async () => {
            const gameObject = {title:'Sanic', genre:'kno de wei'};
            const res = await req(server).post('/games').send(gameObject);
            expect(res.status).toBe(422);
            expect(res.type).toBe('application/json');
            expect(res.body).toEqual({
                error:'Missing genre, or title, or releaseYear.'
            });
        });
        it('Should error if title not unique.', async () => {
            const gameObject = {
                title: 'Pacman',
                genre: 'wockawocka',
                releaseYear: 1738
            };
            const res = await req(server).post('/games')
            .send(gameObject);
            expect(res.status).toBe(405);
            expect(res.type).toBe('application/json');
            expect(res.body).toEqual({
                error:'Title not unique.'
            });
        })
    });

    describe('GET /games', () => {
        it('Should GET list of games from API.', async () => {
            const res = await req(server).get('/games');
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
            expect(res.body).toEqual([
                    'Pacman'
                ]);
        });
        it('Should get empty [] if no games.', async () => {
            let res = await req(server).get('/clear');
            res = await req(server).get('/games');
            expect(res.status).toBe(200);
            expect(res.type).toBe('application/json');
            expect(res.body).toEqual([]);
        });
    });

    describe('GET /clear', () => {
        it('Should already be clear.', async () => {
            let res = await req(server).get('/clear');
            expect(res.status).toBe(400);
            expect(res.type).toBe('application/json');
            expect(res.body).toEqual({
                message:'Already cleared.'
            });
        });
    });
});