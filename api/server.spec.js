const request = require('supertest');
const server = require('./server');

describe('server.js', ()=>{



    describe('POST /games', ()=>{
        //TEST1
        it('should include proper fields; returns 422 if incomplete', async ()=>{

            let gameBody = {
                title: 'Pacman',
                genre: '',
                releaseYear: 1980 
            }
            let response = await request(server).post('/games').send(gameBody)
            
            expect(response.status).toBe(422)
        })
        //TEST 2
        it('should return 200 if complete', async ()=>{
            let gameBody2 = {
                title: 'Mrs. Pacman', 
                genre: 'Arcade', 
                releaseYear: 1980 
            }
            let response = await request(server).post('/games').send(gameBody2);

            expect(response.status).toBe(200)
            

        })

        it('should be able to add posted item to an array', async ()=>{
            let gameBody3 = {
                title: 'Star Fox', 
                genre: 'Action-Adventure', 
                releaseYear: 1993 
            }
            
            let response = await request(server).post('/games').send(gameBody3);

            expect(response.body).toBe(4); //checks the length of the new array

        })

    
        


    })

    describe('GET /games', ()=>{

        //TEST 3
        it('should return list of games w/ proper status code', async ()=>{
            let response = await request(server).get('/games');
            let gameArray = [
                {
                    title: 'Pacman', 
                    genre: 'Arcade', 
                    releaseYear: 1980 
                },
                {
                    title: 'Shadow of Colossus',
                    genre: 'Action-Adventure', 
                    releaseYear: 2005 
                },
                {
                    title: 'Mrs. Pacman', 
                    genre: 'Arcade', 
                    releaseYear: 1980 
                },
                {
                    title: 'Star Fox', 
                    genre: 'Action-Adventure', 
                    releaseYear: 1993 
                }
            ]

            expect(response.body).toEqual(gameArray) //1
            expect(response.status).toBe(200) //2

        }) 

        //TEST 4
        it('should always return an array', async () => {
            let response = await request(server).get('/games');
            expect(Array.isArray(response.body)).toBeTruthy(); //3
        });



    })

})