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

    //TEST FOR POST ROUTE..'/games' (FOUR TEST CASES GROUPED UNDER THIS des)
    describe(" POST ROUTE '/games' ", () => {
          //TEST 1 --- - Incomplete return 422
          it('should return status code 422 if data is not there', async () => {
               let response = await request(server).post('/games')
                                                   .send({});
               expect(response.status).toBe(422);
          })   
     
          //TEST-2 --- Verify endpoint returns correct http status when recieving correct and *incorrect* game data.
          it('should return status code 201 on success', async () => {
               let response = await request(server).post('/games')
                                                 .send({ title: 'Pacman', 
                                                         genre: 'Arcade',
                                                         releaseYear: 1980 });
               expect(response.status).toBe(201); //IF received correct data will return 201
          })

          it('should return status code 201 on success', async () => {
                    let response = await request(server).post('/games')
                                                       .send({ title: 1234, 
                                                            genre: 'Arcade',
                                                            releaseYear: 1980 });
                    expect(response.status).toBe(500); //received incorrect data will return 500
          }) 

          //TEST 3 --- validate the required fields are included inside the body (edited)
          it('should validate for fields entered..', async () => {
                    let response = await request(server).post('/games')
                                                .send({title: 'Pacman', genre: 'Arcade', releaseYear: 1980});
                    expect(response.body.title).toBeDefined;
                    expect(response.body.genre).toBeDefined;
          })
     });

    //TEST FOR GET ROUTE..'/games' (THREE TEST CASES GROUPED UNDER THIS des)
    describe(" GET ROUTE '/games' ", () => {
        //TEST-1 - return status code 200 
          it('should return status code 200 on success', async () => {
               let response = await request(server).get('/games');
               expect(response.status).toBe(200);
          });
        
        //TEST-2 - return an array regardless if return empty array
          it('test to make sure this endpoint always returns an array', async () => {
               let response = await request(server).get('/games');
               let expected = [];
               expect(Array.isArray(response.body)).toBe(true);
               expect(response.body).toEqual(expected);
          });

        //TEST-3 - return list of games */
          it('should return list of games', async () => {
                 let response = await request(server).get('/games');
                 let expected = [
                                   {title : 'GAME-1', genre : 'XYZ'},
                                   {title : 'GAME-2', genre : 'XYZ'},
                                   {title : 'GAME-3', genre : 'XYZ'} 
                                ]
                 expect(response.body).toEqual(expected)
          });
    });


});