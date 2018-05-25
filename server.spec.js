const mongoose = require('mongoose');

const Game = require('./games/Game');

describe('Games', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='));
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
      
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.
  const game = {genre: 'Action', title: 'SuperCops!', releaseDate: '04-23-1990'}
  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
   // let game = {genre: 'Action', title: 'SuperCops!', releaseDate: '04-23-1990'}
  });

  afterEach(() => {
    //   // clear collection.
    return Game.remove();
  });

  it('runs the tests', () => {});

  // test the POST here
  it('should verify the info is sent to the database' , async () => {
    
    const savedGame = await Game.create(game); // new + save

    expect(savedGame.title).toEqual('SuperCops!');
    expect(savedGame.title).not.toEqual('Tommys Train Adventure!');
    expect(savedGame.title).not.toEqual(456);

  })

  // test the GET here
  it('get all games in database', async () => {
    const savedGame = await Game.create(game); // new + save
    expect(savedGame).toEqual(savedGame); 
    expect(savedGame).not.toBe(3453453);
    expect(savedGame).not.toEqual(null);
  })
  

  // Test the DELETE here
  it('Removes the chosen id from the database', async () => {
    const savedGame = await Game.create(game);
    expect(savedGame).not.toContain(savedGame);
    expect(savedGame).not.toBe(57815415);
    expect(savedGame).not.toBe('This is a test!');
  })
});
