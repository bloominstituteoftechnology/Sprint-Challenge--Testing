const req = require('supertest');
const server = require('./server');

describe('server.js', () => {
    describe('GET /games', () => {
        let res;

        beforeAll(async () => {
            res = await req(server).get('/games');
        });

        it('OK (200)', () => {
            expect(res.status).toBe(200);
        });

        it('should return an array', () => {
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('checks if  object has correct properties', () => {
            if (res.body.length > 0) {
                expect(
                    res.body[0].hasOwnProperty('title') &&
                    res.body[0].hasOwnProperty('genre')
                ).toBe(true);
            }
        });
    });

    describe('GET /games/:id', () => {
        let res;

        beforeAll(async () => {
            res = await req(server).get('/games/1');
        });

        it('should return  OK  (200)', () => {
            expect(res.status).toBe(200);
        });

        it('should return an object', () => {
            expect(typeof res.body).toBe('object');
        });

        it('checks on objects properties correctly', () => {
            expect(
                res.body.hasOwnProperty('title') &&
                res.body.hasOwnProperty('genre')
            ).toBe(true);
        });
    });

    describe('POST /games', () => {
        let res;

        beforeAll(async () => {
            res = await req(server).post('/games')
                .send({
                    'title': 'Star Wars',
                    'genre': 'Role-playing',
                    'releaseYear': 2003
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
        });

        it('should return a Created http code (201)', () => {
            expect(res.status).toBe(201);
        });

        it('should return  game\'s id)', () => {
            expect(typeof res.body).toBe('number')
        });

        it('should return  (201) when  title and genre given', async () => {
            const goodReq = await req(server).post('/games')
                .send({
                    'title': 'Galaga',
                    'genre': 'Arcade'
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(goodReq.status).toBe(201);
        });

        it('should return a Not Allowed (405) if given a taken title', async () => {
            const badReq = await req(server).post('/games')
                .send({
                    'title': 'Star Wars',
                    'genre': 'Role-playing'
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(badReq.status).toBe(405);
        });

        it('should return  (422) if not given genre', async () => {
            const badReq = await req(server).post('/games')
                .send({
                    'title': 'Ms. Portal',
                    'releaseYear': 2007
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(badReq.status).toBe(422);
        });

        it('should return an Unprocessable Entity http code (422) if not given title', async () => {
            const badReq = await req(server).post('/games')
                .send({
                    'genre': 'Arcade',
                    'releaseYear': 1980
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(badReq.status).toBe(422);
        });
    });

    describe('DELETE /games/:id', () => {
        let res;

        beforeAll(async () => {
            res = await req(server).delete('/games/1');
        });

        it('should return an Accepted http code (202)', () => {
            expect(res.status).toBe(202);
        });

        it('should return a count of records deleted (1)', () => {
            expect(res.body).toBe(1);
        });

        it('should delete the game with the provided ID', async () => {
            const gameReq = await req(server).get('/games/1');
            expect(gameReq.status).toBe(404); // not found
        });

        it('should return a Not Found http code (404) if game with given id isn\'t found', async () => {
            const badReq = await req(server).delete('/games/-100twenty');
            expect(badReq.status).toBe(404);
        });
    });

    describe('PUT /games/:id', () => {
        let res;

        beforeAll(async () => {
            res = await req(server).put('/games/2')
                .send({
                    'game': 'Portal',
                    'genre': 'Puzzle-platformer',
                    'releaseYear': 2007
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
        });

        it('should return an OK  (200)', () => {
            expect(res.status).toBe(200);
        });

        it('should return a count of the records updated (1)', () => {
            expect(res.body).toBe(1);
        });

        it('should return a Not Found http code (404) if given a bad id', async () => {
            const badReq = await req(server).put('/games/-100two')
                .send({
                    'game': 'Not Portal',
                    'genre': 'Puzzle-platformer'
                })
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            expect(badReq.status).toBe(404);
        });
    });
});
