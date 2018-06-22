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

  it('runs the tests',  async () => {});

  // test away!
  // const game = {
  //   title: 'Call of Duty Modern Warfare 2',
  //   genre: 'Action',
  //   releaseDate: 'April 30, 2018'
  // }

  // const newGame = await Game.create(game);

  // expect(newGame.title).toEqual(Game.title);
});
