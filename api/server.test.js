const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');

afterEach(async () => {
   await db('games').truncate();
});

describe('server.js', () => {
   describe('GET /games endpoint', () => {
      it('should respond with status code 200 ok', async () => {
         let res = await request(server).get('/games');
         expect(res.status).toBe(200);
      });

      it('should respond with JSON', async () => {
         let res = await request(server).get('/games');
         expect(res.type).toMatch(/json/i);
      });

      it('should respond with an empty array', async () => {
         let expected = [];
         res = await request(server).get('/games');
         expect(res.body).toEqual(expected);
      });
   });

   describe('POST /games endpoint', () => {
      it('should respond with status code 201 created', async () => {
         let body = {
            title: 'Kingdom Hearts',
            genre: 'RPG',
            releaseYear: 2019,
         };

         let res = await request(server)
            .post('/games')
            .send(body);
         expect(res.status).toBe(201);
      });

      it('should return the id of the game created', async () => {
         let body = {
            title: 'Kingdom Hearts',
            genre: 'RPG',
            releaseYear: 2019,
         };

         let res = await request(server)
            .post('/games')
            .send(body);

         expect(res.body).toEqual([1]);
      });

      it('should return the id of the game created', async () => {
         let body = {
            title: 'Kingdom Hearts',
            genre: null,
            releaseYear: 2019,
         };

         let res = await request(server)
            .post('/games')
            .send(body);

         expect(res.status).toEqual(422);
      });
   });
});
