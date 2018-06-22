const mongoose = require('mongoose');
const request = require('supertest');
const server = require('./api/server.js');

const Game = require('./games/Game');
const lord = {
  title: 'Lord of the Rings',
  genre: 'fantasy',
  releaseDate: 'Nov-1-2001'
};
const finalfantasy = {
  title: 'Final Fantasy',
  genre: 'fantasy',
  releaseDate: 'Apr-1-2003'
};
const assassins = {
  title: 'Assassin\'s Creed',
  genre: 'historical rpg',
  releaseDate: 'Nov-1-2013'
};
const zelda = {
  title: 'Zelda',
  genre: 'Nintendo rpg',
  releaseDate: 'Aug-1-1998'
};

const gamesArray = [lord, finalfantasy, assassins];


describe.only('The API Server', () => {
  beforeAll(async () => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  afterAll(async () => {
    await Game.deleteMany({title: /([A-Z]|[a-z]|[0-9])\w/ });
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  it('gets a list of all the games', async () => {
      await Game.insertMany(gamesArray);
      const response = await request(server).get('/api/games');
      expect(response.body.length).toBe(3);
  });

});