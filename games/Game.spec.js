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
  it('has the correct title', async (done) => {
    const NESGameSchema = { title: "Super Mario Bros.", genre: "platformer", releaseDate: "09-22-1984" }
    const userGame = await Game.create(NESGameSchema)

    expect(userGame.title).toEqual("Super Mario Bros.")
    done();
  });
  //it('runs the tests', () => {});

  // test away!
});
