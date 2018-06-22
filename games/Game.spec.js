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

  it('checks title', async () => {
    const songIn = { title: 'x', genre: 'pop' , releaseDate: '12/05/2000'};
      const saved = await Game.create(songIn);
      expect(saved.title).toEqual(songIn.title);
  });

  // test away!
  
});



