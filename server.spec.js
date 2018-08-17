const request = require('supertest')

const server = require('./server.js')

describe('server.js', () => {
    describe('root endpoint (/)', () => {
        it('should return an OK status code', async () => {
            
        const expected = 200;
        
        const response = await request(server).get('/');
            //checks
            expect(response.status).toEqual(expected)
        
    })
    it('games should return an OK status code', async () => {
            
        const expected = 200;
        
        const response = await request(server).get('/games');
            //checks
            expect(response.status).toEqual(expected)
    })
    it(`should return 422 when no title given`, async () => {
        const expected = 422;
        const response = await request(server)
        .post('/games')
        .send({ title: null, genre: "fun" });
  
        expect(response.status).toEqual(expected);
      });
      it(`should return 422 when no genre given`, async () => {
        const expected = 422;
        const response = await request(server)
        .post('/games')
        .send({ title: "Doom", genre: null });
  
        expect(response.status).toEqual(expected);
      });
      it('is returning array', async () => {
        const expected = {
            "games": [{"genre": "Arcade", 
            "releaseYear": 1980, 
            "title": "Pacman"}]
        }
         const response = await request(server).get('/games');
        
    
        expect(response.body).toEqual(expected)
      });
      
  it('is returning array', async () => {
    const expected =[]
     const response = await request(server).get('/games');
    

    expect(response.body).toEqual(expect.arrayContaining(expected))
  });
})
})