const server = require('./server.js');
const request = require('supertest');

describe('POST /games', ()=>{
    
    it('Should returns status 422 when make a post to POST /games  && required  data not provided', async () =>{
        let game ={
            title: 'Pacman',
            releaseYear: 1980 
          }
        const response = await request(server)
       .post('/games')
       .send(game)
       expect(response.status).toEqual(422);
    });

    it('Should make a post to POST /games &&  required  data provided', async () =>{
       game ={
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
          }
       const response = await request(server)
       .post('/games')
       .send(game)
       expect(response.body.games[0]).toEqual(game);
    });

    it('Should returns status 201 when make a post to POST /games  &&  required  data provided', async () =>{
      const  game ={
            
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
              
          }
       const response = await request(server)
       .post('/games')
       .send(game)
       expect(response.status).toEqual(201)
    });

    
})