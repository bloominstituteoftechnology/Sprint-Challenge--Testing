const mongoose = require('mongoose');

const Game = require('./games/Game');

describe('The API Server', () => {
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

  let gameId;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
  });

  afterEach(() => {
    //   // clear the games collection.
    // return Title.remove();
    clearGamecollection();
  });

  it('runs the tests', () => {});

  // test the POST here
  describe('post a title', () => {
    it('Checks if game was posted correctly', async (done) => {
      const NESGameSchema = { title: 'tron', genre: 'action', releaseDate: 'August 1989' };
      const newTitle = await Title.create(NESGameSchema);
      expect(newTitle.game).toEqual('tron')
    })
  });

  // test the GET here
  it('Should return a list of all the games', async () => { 
    const response = await request(server).get('/games/Game');
      
      

  })

  // Test the DELETE here
});
