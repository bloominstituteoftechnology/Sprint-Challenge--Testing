const request = require('supertest');
const server = require('./api/server.js');

describe('server.js', () => {
    describe('/ route', () => {
        it('should return status code 200', async () => {
            let response = await request(server).get('/');
            expect(response.status).toBe(200);
        });

        it('should return JSON', async () => {
            let response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        });

        it('should return JSON with body like: { api: "Running" }', async () => {
            let response = await request(server).get('/');
            expect(response.body).toEqual({ api: 'Running' });
        });
    });

    describe('Get Games Enpoint', () => {
        it('Returns Status code 200', async () => {
            let response = await request(server).get('/games');
            expect(response.status).toBe(200);
        })

        it('Returns JSON', async () => {
            let response = await request(server).get('/games');
            expect(response.type).toBe('application/json');
        })

        it('Returns games array', async () => {
            let response = await request(server).get('/games');
            expect(response.body).toEqual(
                [
                    {
                        title: 'Pacman',
                        genre: 'Arcade',  
                    },
                    {
                        title: 'Call of Duty',
                        genre: 'FPS',  
                    },
                    {
                        title: 'Fortnite',
                        genre: 'Battle Royale',  
                    }
                ]
            );
        })
    })

    describe('POST /games', () => {
        it('Returns Status of 200', async () => {
            let response = await request(server)
            .post('/games')
            .send({
                title:"PUBG",
                genre:"Battle Royale"
            });
            expect(response.status).toBe(200)
        });

        it('Return Status of 422 if body does not contain required fields', async () => {
            let response = await request(server)
            .post('/games')
            .send({
                error : "This will make errors happen mwahahaha"
            });
            expect(response.status).toBe(422);
        });

        it('Returns Games Object', async () => {
            let response = await request(server)
            .post('/games')
            .send({
                title:"PUBG",
                genre:"Battle Royale"
            });
            expect(typeof response.body).toBe('object');
        })
    })
});
