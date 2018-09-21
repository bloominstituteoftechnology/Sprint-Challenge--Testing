const request = require('supertest');
const server = require('./server');


describe('server.js', () => {
  describe('GET /games tests', () => {
    it('should return status 200 (ok)', async () => {
      const response = await request(server).get('/games');
      expect(response.status).toEqual(200);
    });//end return success code test

    it('should return game objects or empty array', async () => {
      const response = await request(server).get('/games');
      if(response.body.length){
        const game = response.body[0];
        expect(game).toHaveProperty('title');
        expect(game).toHaveProperty('genre');
      }else{
        expect(Array.isArray(response.body)).toBeTruthy();
      }
    });//end success object test
  });//end of GET games tests

  describe('POST /games tests', () => {
    it('should return 201 on success', async () => {
      const game = {
        title: 'Near Laugh 5',
        genre: 'FPS',
      };

      const response = await request(server).post('/games').send(game);

      expect(response.status).toEqual(201);
    });//end success code test

    it('should return created object on success', async () => {
      const game = {
        title: 'Near Laugh 6',
        genre: 'FPS',
        releaseYear: 2019
      };

      const response = await request(server).post('/games').send(game);

      expect(response.body.title).toEqual('Near Laugh 6');
      expect(response.body).toHaveProperty('id');
    });//end success return object test

    it('should return status 422 with incomplete data', async () => {
      const game = {
        genre: 'strategy',
        releaseYear: 2004
      };
      try{
        const response = await request(server).post('/games').send(game);
      }catch(e) {
        expect(e.status).toEqual(422);
        expect(e.message).toEqual('Missing data');
      }
    });//end POST incomplete data failure test

    it('should return 405(Not Allowed) with duplicate title', async () => {
      const game = {
        title: 'Call of Repeat Duty IX',
        genre: 'Whatever'
      };

      try{
        const responseOne = await request(server).post('/games').send(game);
        const responseTwo = await request(server).post('/games').send(game);
      }catch(e){
        expect(e.status).toEqual(405);
        expect(e.message).toEqual('That title already exists in storage');
      }
    });//end of duplicate title test
  });//end of POST games tests
});//end of server tests
