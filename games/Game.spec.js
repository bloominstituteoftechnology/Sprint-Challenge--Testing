const mongoose = require('mongoose');

const Game = require('./Game');

describe('The Game Model', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log(typeof Game.getGameTitle))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  it('runs the tests', () => {
    console.log(typeof Game.getGameTitle);
  });

  // test away!
  // it('should get game title from database', async () => {
  //   const bilbo = { username: 'bilbo', password: 'baggins' };

  //   const savedUser = await Game.getGameTitle();

  //   expect(savedUser).toEqual(bilbo);
  // });
});
