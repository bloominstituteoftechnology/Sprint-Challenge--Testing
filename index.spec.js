const request = require('supertest');

const server = require('./api/server.js');

describe('index.js', ()=> {
    describe('/GET request for /games endpoint', () => {
        it('should return status code 200', async ()=> {
            const response = await request(server).get('/games');
            expect(response.status).toBe(200);
        })

        it('should return JSON', async ()=> {
            let response = await request(server).get('/games');

            expect(response.type).toBe('application/json');
        })

        it('should return a JSON body: { title: "Pacman", genre: "Arcade", releaseYear: 1980 }', async ()=> {
            const expected = [
                {
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                },
                {
                    title: 'RedDead Redemption II',
                    genre: 'SandBox/Rpg',
                    releaseYear: 2018
                },
                {
                    title: 'FortNite',
                    genre: 'SandBox/Shooter',
                    releaseYear: 2017
                }
            ]
            let response = await request(server).get('/games')
            expect(response.body).toEqual(expected);
        })

        it('should return an array of games', async () => {
            const response = await request(server).get('/games');
            expect(Array.isArray(response.body)).toBe(true);
          });

    })

    describe('/POST request for /games endpoint', ()=> {
            it('should return status code 422 if failed post request', async ()=> {
                const game = {
                    title: "World of Warcraft"
                }

                const response = await request(server).post('/games').send(game)
                expect(response.status).toBe(422)
            })

            it('should return status code 201 if success', async ()=> {
                const game = {
                    title: "World of Warcraft",
                    genre: "MMORPG",
                    releaseYear: 2004
                }

                const response = await request(server).post('/games').send(game)
                expect(response.status).toBe(201);
            })

            it('should return message for success request', async ()=> {
                const game = {
                    title: "World of Warcraft",
                    genre: "MMORPG",
                    releaseYear: 2004
                }
                
                const response = await request(server).post('/games').send(game)
                expect(response.body).toEqual({message: `${game.title} has been successfully added`});
            })

        })
    })

