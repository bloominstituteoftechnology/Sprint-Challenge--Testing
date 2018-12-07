const request = require('supertest')
const server = require('./games')

describe('/ route', () => {
  describe('/games route', () => {
    describe('get /games', () => {

       it('getting all games should return status code 200', async () => {
        const response = request(server).get('/games')
        
      });

      it('should return empty array when no games', async () => {
        const response = request(server).get('/games')
        
        expect(response.body).toEqual([]);
      });

    });

    let games = [
      {
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
      },
      {
        title: 'Zelda',
        genre: 'Adventure',
        releaseYear: 1986
      }
    ]

    describe('post /games', () => {
      
      it('if the game obj is incomplete the status code should be 422', async () => {
        const response = request(server).post('/games').send({
          title: 'donkey kong',
          genre: 'platformer'
        })
       expect(responst.status).toBe(422); 
      });

      it('should return 200 when adding a game obj', async () => {
        const response = request(server).post('/games').send(games[0])
        
       expect(responst.status).toBe(200); 
      });

      it('sending a correct game object should return 200', async () => {
        const response = request(server).post('/games').send(games[1])
        
       expect(responst.status).toBe(200); 
      });

    });

    describe('get /games', () => {

      it('should return array', async () => {
        const response = request(server).get('/games')
        
        expect(response.body).toEqual(games);
      });
    });
  });
});