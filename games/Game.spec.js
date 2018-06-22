const mongoose = require('mongoose');

const Game = require('./Game');

describe('The Game Model', () => {
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
describe('getGameTile', () => { 
  // test away! 

  it('should return the game title', () => {
    const game = new Game({
      title: 'Jungle Games',
      date: 'June 2018',
      genre: 'Sports',
    });
    expect(game.getGameTitle()).toEqual('Jungle Games');
  });
  
    })
});
