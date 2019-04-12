const request = require('supertest');
const server = require('./server');

//  // test away!
// it('runs the test',() =>{
//     expect(true).toBe(true);
// }); 

describe('games', () => {
    describe('get', () => {
      it('runs server with 200', () => {
          return request(server)
          .get('/')
          .then( res => expect(res.status).toBe(200))
      });

      it('runs server with 200', () => {
        return request(server)
        .get('/games')
        .then( res => expect(res.status).toBe(200))
    });
  


    
    });
  });


