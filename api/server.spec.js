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
            const games = response.body;
            if (games.length > 0) {
                expect(typeof games[0]).toEqual('object');
            } else {
                expect(Array.isArray(games)).toEqual(true);
            }

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
            const index = response.body.index;
            await request(server).delete(`/games/${index}`)
        });

        it('should return the index of new post added', async () => {
            let response = await request(server).post('/games').send(gameMock);
            
            const index = response.body.index;
            expect(typeof index).toEqual('number');
            await request(server).delete(`/games/${index}`)
        });

        it('index returned matches index in db', async () => {
            let response = await request(server).post('/games').send(gameMock);
            expect(response.status).toBe(201);

            const index = response.body.index;
            response = await request(server).get('/games')
            const games = response.body;

            expect(games[index]).toEqual(gameMock);
            await request(server).delete(`/games/${index}`)
        });

        it('should return status code 405 if title is not unique', async () => {
            let response = await request(server).post('/games').send(gameMock);
            const index = response.body.index;
            response = await request(server).post('/games').send(gameMock);
            expect(response.status).toBe(405);
            await request(server).delete(`/games/${index}`)
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
            const index = response.body.index;
            await request(server).delete(`/games/${index}`)
        });
    });

    describe('/games delete route', () => {
        it('returns status 200 when delete is succesful', async () => {
            
            let response = await request(server).get('/games');
            const index = response.body.length - 1;

            response = await request(server).delete(`/games/${index}`);

            expect(response.status).toEqual(200)
        });
        
        it('should return 404 if index cant be found', async () => {
            let response = await request(server).get('/games');

            const length = response.body.length;
            
            response = await request(server).delete(`/games/${length+1}`);

            expect(response.status).toEqual(404);
        });

        // return 200 on succesful delete
        // return 404 if index is not found
    });
});