const mongoose = require('mongoose');

const Game = require('./games/Game');
const request = require('supertest');
const server = require('./server');

const dataForUser = [
  {
    title: "First Game",
    genre: "Not Exciting"
  },
  {
    title: "Second Game",
    genre: "More Exciting"
  },
  {
    title: "Third Game",
    genre: "Exciting"
  },
  {
    title: "Final Game",
    genre: "Super"
  }
]

describe('Games', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='));
  });


  beforeEach(() => {
    // return User.remove();
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    dataForUser.forEach(each => {
      let newGame = new Game(each);
      newGame.save()
    })
    return dataForUser;
  });


  afterEach(() => {
    return Game.remove();
    //   // clear collection.
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  let gameId;
  // // hint - these wont be constants because you'll need to override them.





  // it('runs the tests', async () => {});

  // test the POST here
  it('runs the POST  test', async () => {
    const newGame = {
      title: 'New Game of Today',
      genre: 'E sports',
      releaseDate: 'May 2018'
    };
    const newTitle = newGame.title;
    const createNew = await new Game(newGame)
    await createNew.save();
    // const createID = createNew._id
    console.log('New game:', newGame);
    console.log('Created game: ', createNew)
    console.log(('create ID', createNew._id))

    expect(newTitle).toBe(createNew.title);
    return createNew

  });
  //
  // // test the GET here
  it('runs the GET test', async() => {
    const fetchedData = await request(server).get('/api/games');
    // console.log('fetchedData.body: ', fetchedData.body);
    console.log('fetchedData.body[0]._id: ', fetchedData.body.length);
    const title = await fetchedData.body[fetchedData.body.length - 1].title;
    console.log(await fetchedData.body)
    // console.log('title', title)
    // const firstGame = { _id: '5b08399bc9141a1de936200e',
    // title: 'California Games',
    // genre: 'Sports',
    // releaseDate: 'June 1987',
    // __v: 0 };
    // console.log('fetchDayta.body typeof', typeof fetchedData.body)
    // console.log('fetchedData status code: ', fetchedData.status);
    expect(fetchedData.status).toEqual(200);
    // expect(title).toEqual('New Game of Today');
    expect(typeof fetchedData.body).toBe('object')
  })

  // Test the DELETE here
  it('runs the DELETE test', async() => {
    const fetchedData = await request(server).get('/api/games');
    const id = await fetchedData.body[fetchedData.body.length - 1]._id;
    const game = await Game.findById(id);
    // console.log('The game to be deleted: ', game);
    expect(game).not.toBeNull();
    const deleteGame = await Game.findByIdAndRemove(id);
    const confirm = await Game.findById(id);
    // console.log('This is the deleted output: ',deleteGame);
    expect(confirm).toBeNull();
  });

  //Test the UPDATE here
  it('runs the UPDATE test', async() => {
    const fetchedData = await request(server).get('/api/games');
    const id = await fetchedData.body[fetchedData.body.length - 1]._id;
    const game = await Game.findById(id);
    expect(game).not.toBeNull();
    const options = {
      new: true,
    };
    const gameUpdate = {
      title: 'Next to final another test',
      genre: 'E For electronic II',
      releaseDate: '2018'
    };


    const update = await Game.findByIdAndUpdate(id,gameUpdate,options)
    const confirm = await Game.findById(id);
    console.log('Update game to Cali Games', confirm, game)
    expect(game).not.toEqual(confirm);

  })

});
