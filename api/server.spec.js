const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./server');
const Game = require('../games/Game');

describe('The API Server', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(async () => {
    await Game.create({
      title: 'Mario',
      genre: 'Adventure',
      releaseDate: 'May 1980'
    });

    await Game.create({
      title: 'PacMan',
      genre: 'Arcade',
      releaseDate: 'June 1981'
    })
  });

  afterEach(async () => {
    //   // clear the games collection.
    await Game.remove();

  });


  it('has a GET / endpoint', async () => {
    await request(server)
        .get('/api/games')
        .expect(200)
  })

  it('has a GET / endpoint that returns 200', async () => {
      await request(server)
          .get('/api/games')
          .expect(200)
  })

  it('returns a list of games', async () => {
      const response = await request(server).get('/api/games')
      const expected = {
        title: 'Mario',
        genre: 'Adventure',
        releaseDate: 'May 1980'
      };
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toMatchObject(expected);
  })

  // it('should return user data after successfully saved to db',
  //     async () => {
  //         console.log('TEST', mario)
  //         await request(server).post('/api/games/', mario)
  //             .expect(201);
  //     })

// it('should return status 202 after successfully deleting from db',
//     async () => {
//         // const testUserData = {
//         //     username: 'Lisa',
//         //     password: '123'
//         // }
//         console.log('TEST', testUserData)
//         await request(server).delete('/', testUserData)
//             .expect(202);
// })

});
