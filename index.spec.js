const server = require('./api/server.js');
const request = require('supertest');

describe('server', ()=>{
    it('can run test',()=>{
        expect(true).toBeTruthy();
    })
    it('can run more test', ()=>{
        expect(false).toBeFalsy();
    })

    describe('GET /games',()=>{
        it('should return status code 200(OK)', async ()=>{
            const response = await request(server).get('/games');
            expect(response.status).toBe(200);
        })
        it('should return an array type', async ()=>{
            const response = await request(server).get('/games');
            expect(Array.isArray(response.body)).toBe(true);
        })
        it('should return a default memory data ', async () =>{
            const response = await request(server).get('/games');
            expect(response.body).toEqual([
                {
                    title: 'Pacman', // required
                    genre: 'Arcade', // required
                    releaseYear: 1980 // not required
                  }
            ]);
        })
    })

    describe('POST /games', ()=>{
        it('should add new game object into memory', async ()=>{
            const response = await request(server).post(`/games`).send( {
                title: 'Street Fighter', // required
                genre: 'Arcade', // required
              });
            expect(response.body).toEqual([
                {
                    title: 'Pacman', // required
                    genre: 'Arcade', // required
                    releaseYear: 1980 // not required
                },
                {
                    title: 'Street Fighter', // required
                    genre: 'Arcade', // required
                }
            ])
        })
        it('should return status code 201(OK)', async ()=>{
            let response = await request(server).post(`/games`).send({});
            expect(response.status).toBe(500);
            response = await request(server).post(`/games`).send({title: "Contra"});
            expect(response.status).toBe(500);
            response = await request(server).post(`/games`).send({genre: "Arcade"});
            expect(response.status).toBe(500);
            response = await request(server).post(`/games`).send({title: "Contra", genre:"Arcade"});
            expect(response.status).toBe(201);
        })
        it('should return an array type', async ()=>{
            let response = await request(server).post(`/games`).send({});
            expect(Array.isArray(response.body)).toBe(true);
            response = await request(server).post(`/games`).send({title: "Uno", genre:"Board Game"});
            expect(Array.isArray(response.body)).toBe(true);
        })

      
    })

    
    
    // describe('DELETE /hello/:name',()=>{
    //     it('should return status code 201(OK)', async ()=>{
    //         const name = 'Tsai';
    //         const response = await request(server).delete(`/hello/${name}`);
    //         expect(response.status).toBe(201);
    //     })
    //     it('should return JSON', async ()=>{
    //         const name = 'Tsai';
    //         const response = await request(server).delete(`/hello/${name}`);
    //         expect(response.type).toBe('application/json');
    //     })

    //     it('should confirm if the person has been deleted', async ()=>{
    //         const name = 'Tsai';
    //         // const lastName = 'Huang';
    //         const expected = { deleted: 'Tsai'};

    //         const response = await request(server).delete(`/hello/${name}`);
    //         //.send({ lastName});
    //         expect(response.body).toEqual(expected);
    //     })
    // })
    // describe('PUT /hello/:name',()=>{
    //     it('should return status code 200(OK)', async ()=>{
    //         const name = 'Tsai';
    //         const lastName = 'Huang';
    //         const response = await request(server).put(`/hello/${name}`).send({lastName});
    //         expect(response.status).toBe(200);
    //     })
    //     it('should return JSON', async ()=>{
    //         const name = 'Tsai';
    //         const lastName = 'Huang';
    //         const response = await request(server).put(`/hello/${name}`).send({lastName});
    //         expect(response.type).toBe('application/json');
    //     })

    //     it('should confirm if the person has been updated', async ()=>{
    //         const name = 'Tsai';
    //         const lastName = 'Huang';
    //         const expected = { updated: 'Tsai Huang'};

    //         const response = await request(server).put(`/hello/${name}`)
    //         .send({ lastName});
    //         expect(response.body).toEqual(expected);
    //     })
    // })
    
    
})