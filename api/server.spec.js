const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig.js');

describe('The Route Handlers',()=> {
     describe(`Tests for get requests --> get('/')`, ()=> {
          test(`It should respond with 200`, async () => {
               const response = await request(server).get('/');
               expect(response.status).toBe(200);
          });

          test(`It should respond with json data`, async () => {
              const data = await request(server).get('/');
              expect(data.type).toMatch(/json/i);
          });

          test(`It should respond send us correct response object `, async () => {
              const response = await request(server).get('/');
              expect(response.body).toEqual({api: `Server is up and running..keep writing the code`});
          });

          test(`It should respond send correct response object for /games request`, async () => {
              const response = await request(server).get('/games');
              expect(response.body).toEqual([]);
          })
     });

     describe(`Tests for Post requests --> post('/games')`, () => {
          afterEach( async () => {
             await db('games').truncate();
          });

          test(`It should send with a 500 error code when body is correct and server error`, async () => {
                  const body = {title:"cricket", genre:"outdoor", releaseYear:"1550"};
                  const response = await request(server).post('/games').send(body);
                  expect(response.status).toBe(500);
          });

          test(`It should send with a 422 error code when there is no body`, async ()=>{
                  const body = {};
                  const response = await request(server).post('/games').send(body);
                  expect(response.status).toBe(422);
          });

          test(`It should respond with a 422 error code if there is no title`, async () => {
                const body = { title: '', genre: 'indoor', releaseYear: '1950'};
                const response = await request(server).post('/games').send(body);
                expect(response.status).toEqual(422);
          });

          test(`It should respond with a 422 error code if there is no genre`, async () => {
            const body = { title: 'kings', genre: '', releaseYear: '1950'};
            const response = await request(server).post('/games').send(body);
            expect(response.status).toBe(422);
         });
         
     });
});