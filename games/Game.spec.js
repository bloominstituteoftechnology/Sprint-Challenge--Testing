const mongoose = require('mongoose');

const Game = require('./Game');

describe('The Game Model', () => {
  let gameId = {title: "Super Mario Bros.", genre: "Action/Adventure", releaseDate: "October 18, 1985"};

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

  beforeEach(() => {
    Game.create(gameId);
  })

  afterEach(() => {
    Game.remove();
  })

  it('should have a title that is a string', () => {
    expect(typeof gameId.title).toBe('string');
  });

  it('should have a genre type that is a string', () => {
    expect(typeof gameId.genre).toBe('string');
  })

  it('should have a release date that is a string', ()=> {
    expect(typeof gameId.releaseDate).toBe('string')
  })

  it('should have a function that returns a title', () => {
    const getGameTitle = jest.fn();
    expect(typeof getGameTitle).toBe("function")
  })
  // test away!
});
