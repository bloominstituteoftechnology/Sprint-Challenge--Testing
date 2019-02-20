const server = require('./server.js');
const request = require('supertest');

describe.skip('POST /games', ()=>{
    
    it('Should return status 422 when make a post to POST /games  && required  data not provided', async () =>{
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

    it('Should return status 201 when make a post to POST /games  &&  required  data provided', async () =>{
      const  game ={
            
                title: 'PacmanII', // required
                genre: 'Arcade', // required
                releaseYear: 1982 // not required
              
          }
       const response = await request(server)
       .post('/games')
       .send(game)
       expect(response.status).toEqual(201)
    });

    
});

describe('GET /games', ()=>{
   
    it(' HTTP status code 200 ', async () =>{
        const response = await request(server)
       .get('/games')
       expect(response.body.games.length).toBeGreaterThanOrEqual(0)
       expect(response.status).toEqual(200);
    });
  

    it('always returns an array, even if there are no games stored', async () => {
        const expected = [];
        const response = await request(server)
        .get('/games')
      expect(response.body.games).toEqual(expect.arrayContaining(expected));
    })

    it('should fail when expected game isnt yet posted', async () => {
         const  game ={
            
            title: 'PacmanIII', // required
            genre: 'Arcade', // required
            releaseYear: 1983 // not required
          
      };
        const response = await request(server)
        .get('/games')
    expect(response.body.games)
    .toEqual(expect.arrayContaining([expect.objectContaining(game)]))})

 it('should pass when expected game has been stored', async () => {
         const  game ={
            title: 'PacmanII', // required
            genre: 'Arcade', // required
            releaseYear: 1982 // not required
      };
        const response = await request(server)
        .get('/games')
    expect(response.body.games)
    .toEqual(expect.arrayContaining([expect.objectContaining(game)]))})



})

