const request = require("supertest")
const mongoose = require('mongoose');
const server = require('./server')
const Game = require('./games/Game');
let gameId;
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

 
  // // hint - these wont be constants because you'll need to override them.

  beforeEach(() => {
    //   // write a beforeEach hook that will populate your test DB with data
    //   // each time this hook runs, you should save a document to your db
    //   // by saving the document you'll be able to use it in each of your `it` blocks
    const newGame = new Game({
        title: 'California Games',
        genre: 'Sports',
        releaseDate: 'June 1987'
    })
      newGame.save((err,savedGame)=>{
    if(err){
      console.log(err)
    }else{
      gameId = savedGame._id
      console.log(gameId)
    }
  })

  });

  afterEach(() => {
return Game.remove()
  });

  it('runs the tests', () => {});


  // test the POST here
it('should create a game', async()=>{
const game = {
  title: 'California Games',
  genre: 'Sports',
  releaseDate: 'June 1987'
}
const response = await request(server)
.post('/api/games')
.send(game)


expect(response.body).toHaveProperty("_id")
expect(response.body).toHaveProperty("title")
expect(response.body).toHaveProperty("genre")
expect(response.body).toHaveProperty("releaseDate")
expect(response.status).toEqual(201)
expect(response.type).toEqual("application/json")
})
  // test the GET here
it("should fetch a game",async()=>{
  const response = await request(server)
  .get('/api/games')
  expect(response.status).toEqual(200)
  expect(response.type).toEqual("application/json")
})
  // Test the DELETE here
  it('should delete a game',async ()=>{
 
    console.log('id',gameId )
    const response = await request(server)
    .delete(`/api/games/${gameId}`)
    expect(response.status).toEqual(200)
  })
  // it('should delete a game',async ()=>{
  //   const update = {
  //     title: 'California Gamez',
  //     genre: 'Sportz',
  //     releaseDate: 'June 1999'
  //   }
  //   const response = await request(server)
  //   .put(`/api/games/${gameId}`)
  //   .send(update);
  //   console.log('aaa',update)
  //   expect(response.status).toEqual(200)
  // })
});
