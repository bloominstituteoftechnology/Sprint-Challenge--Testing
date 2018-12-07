const request = require('supertest');

const server = require('./server');


describe('server', () => {
    describe('/', () => {
        it('should return status code 200', async () => {
            let response = await request(server).get('/');
            expect(response.status).toBe(200);
        });
        it('should return JSON', async () => {
            let response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        });
    });

    describe('/games post route', () => {
        const gameMock = {
            title: 'Pacman', // required
            genre: 'Arcade', // required
            releaseYear: 1980 // not required
        }

        it('should return status code 201 if post is succesful', async () => {
            let response = await request(server).post('/games').send(gameMock);
            expect(response.status).toBe(201);
        });

        it('should respond with status code 422 if title is not passed', async () => {
            const {title, ...titleOmmited} = gameMock;

            let response = await request(server).post('/games').send(titleOmmited);
            expect(response.status).toBe(422);
        });

        it('should respond with status code 422 if genre is not passed', async () => {
            const {genre, ...genreOmmited} = gameMock;

            let response = await request(server).post('/games').send(genreOmmited);
            expect(response.status).toBe(422);
        });

        it('should respond with status code 201 if releaseYear is not passed', async () => {
            const {releaseYear, ...releaseOmmited} = gameMock;

            let response = await request(server).post('/games').send(releaseOmmited);
            expect(response.status).toBe(201);
        });

        it('should return the index of new post added', async () => {
            let response = await request(server).post('/games').send(gameMock);
            
            const index = response.body.index;
            expect(typeof index).toEqual('number');
        });

        it('index returned matches index in db', async () => {
            let response = await request(server).post('/games').send(gameMock);
            expect(response.status).toBe(201);

            const index = response.body.index;
            response = await request(server).get('/games')
            const games = response.body;

            expect(games[index]).toEqual(gameMock);
        });

        it('should return status code 405 if title is not unique', async () => {
            let response = await request(server).post('/games').send(gameMock);
            expect(response.status).toBe(405);
        });

    });

    describe('/games get route', () => {
        it('returns status 200', async () => {
            let response = await request(server).get('/games');
            expect(response.status).toBe(200);
        });
        
        it('should return array', async () => {
            let response = await request(server).get('/games');
            const games = response.body;
            expect(Array.isArray(games)).toEqual(true);
        });

        it('should return array of objects', async () => {
            let response = await request(server).get('/games');

            expect(typeof response.body[0]).toEqual('object');
        });
    });
});