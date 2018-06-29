const mongoose = require('mongoose');
const request = require( 'supertest' );
//const server = require( './api/server' );
const Game = require( '../games/Game' );

describe('Game', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  } );
  
  

  // afterAll(() => {
  //   return mongoose
  //     .disconnect()
  //     .then(() => console.log('\n=== disconnected from TEST DB ==='));
  // });

  let gameId, game;
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(async() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` 
    game = await Game.create( { title: 'playgame', genre: 'play' } );
    gameId = game._id;

  });

  // afterEach(() => {
  //   //   // clear the games collection.
  //   return Game.remove();
  // });
  
  it('runs the tests', () => {});


  // test the POST here
  it( 'POST', async () => {

    const response = await request( server ).post( './games/Game' ).send(game);

    expect( response.status ).toEqual(201);
    expect( response.type ).toEqual('application/json');
    expect( response.body.title ).toEqual('playgame');
  } );

  
  // test the GET here

  // Test the DELETE here
});
