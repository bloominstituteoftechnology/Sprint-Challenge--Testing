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

  it('runs the tests', () => {});

  // test away!
});
it('Should be able to return the title', () => {
  const newTitle = Title.create(testTitle);
  const newGenre = Genre.create(testGenre);

  expect(newTitle.title).toBe(true);


});

it('it should Return the releaseDate for the title', () => {
  const tron = { title: 'tron', releaseDate: 'August 1989' };
  // console.log(genre);

  const savedTitle = Title.create(tron);

  expect(savedTitle.title).toEqual(tron.title);
  expect(savedTitle.releaseDate).toBe(true);

});
