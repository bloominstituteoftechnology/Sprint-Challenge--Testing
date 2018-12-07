const request = require('supertest');

const server = require('./server.js');

//TESTS FOR SERVER.JS TO TEST ALL ROUTE FUNCTIONING...
describe('server.js', () => {
    
    //TEST FOR FIRST BASIC ROUTE...(THREE TEST CASES GROUPED UNDER THIS des)
    describe(" BASIC ROUTE '/' ", () => {
        it('should return status code 200', async () => {
             let response = await request(server).get('/');
             expect(response.status).toBe(200);
        })

        it('should return JSON', async () => {
             let response = await request(server).get('/');
             expect(response.type).toBe('application/json');
        });
      
        it('should return with a body like: {message : "SERVER UP"}', async () => {
             let response = await request(server).get('/');
             expect(response.body).toEqual({message : "SERVER UP"});
        });
    });

    //TEST FOR FIRST POST ROUTE..'/games' (TWO TEST CASES GROUPED UNDER THIS des)
    describe(" POST ROUTE '/games' ", () => {
        it('should return status code 201 on success', async () => {
             let response = await request(server).post('/games')
                                                 .send({ title: 'Pacman', 
                                                         genre: 'Arcade',
                                                         releaseYear: 1980 });
             expect(response.status).toBe(201);
        })

        it('should return status code 422 if data is not there', async () => {
            let response = await request(server).post('/games')
                                                .send({});
            expect(response.status).toBe(422);
       })
        
    });
});