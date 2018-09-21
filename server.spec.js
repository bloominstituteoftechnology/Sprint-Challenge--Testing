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
        expect(response.body)
          .toEqual(expect.arrayContaining([
            expect.objectContaining({
              title: expect.any(String),
              genre: expect.any(String),
            })
          ]));
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

      expect(response.body).toEqual(expect.objectContaining({
        title: expect.stringContaining('Near Laugh 6'),
        genre: expect.stringContaining('FPS'),
        releaseYear: 2019
      }));
    });//end success return object test

    it('should return status 422 with incomplete data', async () => {
      const game = {
        genre: 'strategy',
        releaseYear: 2004
      };
      const response = await request(server).post('/games').send(game);
      expect(response.status).toEqual(422);

    });//end POST incomplete data failure test

    it('should return 405(Not Allowed) with duplicate title', async () => {
      const game = {
        title: 'Call of Repeat Duty IX',
        genre: 'Whatever'
      };

      const responseOne = await request(server).post('/games').send(game);
      const responseTwo = await request(server).post('/games').send(game);

      expect(responseTwo.status).toEqual(405)

    });//end of duplicate title test
  });//end of POST games tests

  describe('GET /games/:id tests', () => {
    it('should return object with matching id', async () => {
      const game = {
        title: 'Another Field of Battle 12',
        genre: 'FPS',
      };

      const sent = await request(server).post('/games').send(game);
      const response = await request(server).get(`/games/${sent.body.id}`);

      const expectedRes = {
        ...game,
        id: sent.body.id
      };

      expect(response.body).toEqual(expectedRes);
    });//end success get by id test

    it('should return status 404(File Not Found) if id is incorrect', async () => {

        const response = await request(server).get('/games/999999');
        expect(response.status).toEqual(404);
    });//end by id test
  })//end get game by id tests

  describe('DELETE /games/:id tests', () => {
    it('should return the id of the delete game', async () => {
      const game = {
        title: 'Hack Nothing',
        genre: 'MUDD',
        releaseYear: 1993
      };
      const sent = await request(server).post('/games').send(game);
      const response = await request(server).delete(`/games/${sent.body.id}`);

      expect(response.body).toEqual(sent.body.id);
    });//end successful delete

    it('should return 404 if game does not exist', async () => {
        const response = await request(server).delete('/games/9999999999');
        expect(response.status).toEqual(404);
    });//end bad id fail test
  });//end delete tests
});//end of server tests
