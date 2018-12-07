const request = require('supertest')
const server = require('./server')

describe('/ route', () => {
  describe('/games route', () => {
    describe('get /games', () => {

      it('should return empty array when no games', async () => {
        const response = await request(server).get('/games')
        
        expect(response.body).toEqual([]);
      });

    });

    let games = [
      {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // required
      },
      {
        title: 'Zelda',
        genre: 'Adventure',
        releaseYear: 1986
      }
    ]

    describe('post /games', () => {
      
      it('if the game obj is incomplete the status code should be 422', async () => {
        const donkeyKong = {
          title: 'donkey kong',
          genre: 'platformer',
          releaseYear: undefined
        }
        const response = await request(server).post('/games').send(donkeyKong)
       expect(response.status).toBe(422); 
      });

      it('should return 200 when adding a game obj', async () => {
        const response = await request(server).post('/games').send(games[0])
        
       expect(response.status).toBe(200); 
      });

      it('sending a correct game object should return 200', async () => {
        const response = await request(server).post('/games').send(games[1])
        
       expect(response.status).toBe(200); 
      });

    });

    describe('getting /games', () => {
       it('getting all games should return status code 200', async () => {
        const response = await request(server).get('/games')
        
       expect(response.status).toBe(200); 
      });


      it('should return array', async () => {
        const response = await request(server).get('/games')
        
        expect(response.body).toEqual(games);
      });
    });
  });
});