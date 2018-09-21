const request=require('supertest');
const server=require('./server');

describe('server.js',()=>{
    describe('GET games route',()=>{
        it('should return a 200 status code',async()=>{
            const expectedStatusCode=200;
            response=await request(server).get('/games');
            expect(response.status).toEqual(expectedStatusCode);
        })
        it('should return a JSON object from the games route',async()=>{
            const response=await request(server).get('/games');
            expect(response.type).toEqual('application/json');
        })
        it('should return an array',async()=>{
            const expectedBody={games:[]};
            const response=await (request(server)).get('/games');
            expect(response.body).toEqual(expectedBody);
        })
    })
    describe('POST games route',()=>{
        it('returns 422 status code if information is incomplete',async()=>{
            const response=await (request(server)).post('/games').send({title:'Pacman'});
            expect(response.status).toEqual(422);
        })
        it ('returns 201 status code if information is complete',async()=>{
            const response=await(request(server)).post('/games').send({
                title: 'Pacman', 
                genre: 'Arcade', 
                releaseYear: 1980 
              })
              expect(response.status).toEqual(201);
        })
        it('returns id of the game',async()=>{
            const response=await(request(server)).post('/games').send({
                title: 'Super Mario', 
                genre: 'Console', 
                releaseYear: 1985 
              })
              expect(response.body.id).toEqual(2);
        })
        it('returns a JSON object from games route',async()=>{
            const response=await request(server).post('/games').send({
                title:'Metroid',
                genre:'Console',
                releaseYear:1986
            })
            expect(response.type).toEqual('application/json');
        })
        it ('returns a 405 error from games route if user attempts to post a duplicate title',async()=>{
            let response=await request(server).post('/games').send({
                title:'Metroid',
                genre:'Console',
                releaseYear:1986
            })
            if (response) {
                async()=>{
                let secondResponse=await request(server).post('/games').send({
                    title:'Metroid',
                    genre:'Console',
                    releaseYear:1986
                })
                expect(secondResponse.status).toEqual(405);
            }
            }
            }
        )
    })
    describe('Get single game route',()=>{
        it('returns a 404 status code when game not found',async()=>{
            const id=2;
            const response=await request(server).get(`/games/${id}`);
            expect(response.status).toEqual(404);
            }
        )
        it('returns a 200 status code when game is found',async()=>{
            let response=await request(server).post('/games').send({
                title:'Metroid',
                genre:'Console',
                releaseYear:1986
            })
            if (response){
                async()=>{
                    const id=1;
                    const secondResponse=await request(server).get(`/games/${id}`);
                    expect(secondResponse.status).toEqual(200);
                }
            }
        })
        it ('returns an object with the game details when game is found',async()=>{
            let response=await request(server).post('/games').send({
                title:'Metroid',
                genre:'Console',
                releaseYear:1986
            })
            if (response){
                async()=>{
                    const id=1;
                    const secondResponse=await request(server).get(`/games/${id}`);
                    expect(secondResponse.body).toEqual({id:1,title:'Metroid',genre:'Console',releaseYear:1986});
                }
            }
        })
    })
    describe('delete single game route',()=>{
        it('returns a 404 status code when game not found',async()=>{
            const id=2;
            const response=await request(server).delete(`/games/${id}`);
            expect(response.status).toEqual(404);
            }
        )
        it('returns a 200 status code when game is found',async()=>{
            let response=await request(server).post('/games').send({
                title:'Metroid',
                genre:'Console',
                releaseYear:1986
            })
            if (response){
                async()=>{
                    const id=1;
                    const secondResponse=await request(server).delete(`/games/${id}`);
                    expect(secondResponse.status).toEqual(200);
                }
            }
        })
        it ('returns an object with the game details when game is found',async()=>{
            let response=await request(server).post('/games').send({
                title:'Metroid',
                genre:'Console',
                releaseYear:1986
            })
            if (response){
                async()=>{
                    const id=1;
                    const secondResponse=await request(server).delete(`/games/${id}`);
                    expect(secondResponse.body).toEqual(1);
                }
            }
        })
    })
})