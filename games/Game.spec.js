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

  afterEach(() => {
    return Game.remove();
  })

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  //Validate model at Mongoose Schema level.
  it('Validation error: required title', () => {
    const game = new Game({genre: 'Sports', releaseDate: 'June 1987'});

    game.validate(response => {
      expect(response.errors.title).toBeDefined()
    });
  });

  // Validate model at database level
  it('Validation error: required genre', async () => {
    const game = {title: 'California Games'};

    const response = await Game
      .create(game)
      .then(game => {
        expect(response).toEqual(200)
      })
      .catch(err => {
        expect(err.errors.genre.message).toEqual('Path `genre` is required.')
      })
  });


  it('Should create a Game', async () => {
    const game = {title: 'California Games', genre: 'Sports', releaseDate: 'June 1987'};
    
    const savedGame = await Game.create(game);
    
    expect(savedGame.title).toEqual(game.title);
    expect(savedGame.genre).toEqual(game.genre);
    expect(savedGame.releaseDate).toEqual(game.releaseDate);

  });
  
  it('Find a Game by id ', async () => {
    const game = {title: 'California Games', genre: 'Sports', releaseDate: 'June 1987'};

    const savedGame = await Game.create(game);
    const foundGame = await Game.findById(savedGame._id)

    expect(foundGame.title).toEqual(game.title);
    expect(foundGame.genre).toEqual(game.genre);
    expect(foundGame.releaseDate).toEqual(game.releaseDate);

  });

  // test away!
});