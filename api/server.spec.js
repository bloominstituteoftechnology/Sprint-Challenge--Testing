const request = require('supertest');
const  server = require('./server');
const db = require('../data/dbConfig');


describe('endpoints for games', ()=>{
   
    describe('/post', ()=>{
        afterEach(async ()=>{
            await db('games').truncate();
        })

      it('responds with a 201', async ()=>{
          const body = {name:'Tetris', genre:'Arcade'};
          const response = await request(server).post('/games').send(body);

          expect(response.status).toBe(201);
      }),
      it('respond with type JSON ', ()=>{
        const body = {name:'Tetris', genre:'Arcade'};
        const response = await request(server).post('/games').send(body);

        expect(response.type).toMatch(/json/i)
      }),
      it('it responds with games data', ()=>{
          const body = {name:'Tetris', genre:'Arcade'};
          const response = await request(server).post('/games').send(body);

        expect(response.body).toEqual({name:'Tetris', genre:'Arcade'})
      }),
      it('should return 401', async ()=>{
          const body = {};
          const response = await request(server).post('/games').send(body);

          expect(response.status).toBe(401);
      })
    })
    
    describe('get /games', ()=>{
        it('responds with a 200', async ()=>{
            const response = await request(server).get('/games');

            expect(response.status).toBe(200)
        }),
        it('responds with Json', async ()=>{
            const response = await request(server).get('/games');

            expect(response.type).toMatch(/json/i);
        })
        it('responds with with the array', async ()=>{
            const response = await request(server).get('/games');

            expect(response.data).toEqual([]);
        } )
    })
})