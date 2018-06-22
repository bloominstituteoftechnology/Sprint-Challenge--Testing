const mongoose = require('mongoose');
const server = require('../api/server');
const Game = require('./Game');
const tester = require('supertest');

describe('The Game Model', () => {
  let gamer1;
  let gamer2;

  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  beforeEach((() => {
    gamer1 = {
      title: 'Gamers Mo',
      genre: 'Traveler',
      releaseDate: 'January 2019'
    },
      gamer2 = {
      title: 'Gamer ellen',
      genre: 'Teacher',
      releaseDate: 'October 2018'
      }
  }))

  afterEach(() => {
    return Game.remove();
  })

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  it('runs the tests', async () => {
  
    // test away!
    let mainGamer = await tester(server).post('/api/games').send(gamer1);
    
    // had to refrence server.js line 14 to get the correct status code
    expect(mainGamer.status).toEqual(201);
    expect(mainGamer.body.title).toEqual('Gamers Mo');
    // expect(res.data[0].Game).toEqual(Game.title);

    
  });
});
