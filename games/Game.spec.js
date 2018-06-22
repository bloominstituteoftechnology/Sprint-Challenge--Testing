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

  beforeEach(async () => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    await Game.create({
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    })
  });

  afterEach(async () => {
    //   // clear the games collection.
    await Game.remove()
  });

  it('runs the tests', async () => {

  // test away!
  const findGame = await Game.findOne({title: 'California Games'})
  console.log(findGame.getGameTitle())
  expect(findGame.getGameTitle()).toEqual('California Games')
  });
});
