const mongoose = require('mongoose');
const Request = require('supertest');
const server = require('./server');
const Game = require('./games/Game');

describe('Games', () => {

  const myGame ={
    title: "Batman vs Superman",
    genre: "Superheros",
    releaseDate: "01/01/2020",
  }

  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='));
  });
  afterAll( async () => {
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

  afterEach(() => Game.remove() );

  // test the POST here
  describe('Post', () => {
    it("should return 500 if no info is sent", async () => {
      const response = await Request(server)
      .post('/api/games')
      const { status } = response;
      expect(status).toEqual(500);
      
    })
    it("should return 500 if only title is sent", async () => {
      const response = await Request(server)
      .post('/api/games')
      .send({ title: "NewMovie" })
      const { status } = response;
      expect(status).toEqual(500);
    })
    it("should return 500 if only genre is sent", async () => {
      const response = await Request(server)
      .post('/api/games')
      .send({ genre: "NewGenre" })
      const { status } = response;
      expect(status).toEqual(500);
    })
    it("should return 201 if title & genre are sent (no releaseDate needed)", async () => {
      const response = await Request(server)
      .post('/api/games')
      .send({ title: "NewMovie", genre: "NewGenre" })
      const { status } = response;
      expect(status).toEqual(201);
    })
  })

  // test the GET here
  describe("GET", () => {
    it('Should return a list of all games with status 200', async () => {
      const response = await Request(server)
      .get('/api/games')
      .then(res => {
        expect(res.status).toEqual(200)
        expect(res.type).toBe('application/json')
        expect(res.body).toHaveLength(0)
      })
    })

  // it('Should return a list of all games', async () => {
  //   const response = await Request(server)
  //   .get('/api/games')
  //   const { status, type, body } = response;
  //   // const { title, genre } = body;
  //   expect(status).toEqual(200)
  //   expect(type).toEqual('application/json')
  //   // expect(title).toEqual("hello")
   
  // });
      // 
      // const savedGame = await Game.create(myGame)
      
      // const secondGame = await Game.create({ title: 'WonderWoman', genre: 'Superheros' })
      // Request(server)
      // .get('/api/games')
      // .expect(200)
      // expect(body).toHaveLength(2)
  // const myGame2 ={
  //   title: "Spiderman vs Superman",
  //   genre: "Superheros",
  //   releaseDate: "01/01/2020",
  // }

})
  // Test the DELETE here
  describe("DELETE", () => {
    it('Should delete a game by id with code 204', async () => {
      const savedGame = await Game.create(myGame)
      const response = await Request(server)
      .delete(`/api/games/${savedGame._id}`)      
      const { status, body } = response;
      expect(status).toEqual(204)
    })

    it('Should return error (should be 422 but not working) if no ID provided', async () => {
     await 
     Request(server)
      .delete(`/api/games`)      
      .then(res => expect(res.status).toEqual(404))
    })

    it('Should return error if incorrect ID is provided', async () => {
      // const savedGame = await Game.create(myGame)
      const expected = { message: 'Game not found' }
     await 
     Request(server)
      .delete(`/api/games`)      
      .then(res => {
        expect(res.status).toEqual(404)
        expect(res.type).toBe("text/html")
        expect(res.clientError).toEqual(true)
      })

    })
  })
  
  const myGame2 ={
    title: "Spiderman vs Superman",
    genre: "Superheros",
    releaseDate: "01/01/2020",
  }


  describe("PUT", () => {
    it('Should return an error if no ID || Title', async () => {
      const savedGame = await Game.create(myGame)
      const changes = { title: 'Thor', genre: 'gods' }
      await
      Request(server)
      .put(`/api/games/${savedGame._id}`)
      .send(changes)
      .then(res => {
        expect(res.status).toEqual(422)
        expect(res.body).toEqual({"error": "Must Provide a title && Id"})
        expect(res.type).toBe("application/json")
      })
    })
    it('Should return an updated game', async () => {
      const savedGame = Game.create(myGame2)
      const changes = { title: 'Thor' }
      await
      Request(server)
      .put(`/api/games/${savedGame._id}`)
      .send(changes)
      .then(res => {
        expect(res.status).toEqual(200)
        expect(res.type).toBe("application/json")
        expect(res.text).toContain()
      })
    })
  })
})
