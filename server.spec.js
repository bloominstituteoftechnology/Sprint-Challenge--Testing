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
        
    })
})