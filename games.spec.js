const request = require('supertest')
const server = require('./games')

describe('/ route', () => {

  describe('/games route', () => {

    describe('get /games', () => {
      
      
      it('should return empty array when no games', async () => {
        const response = request(server)
        
      });

    });

    describe('post /games', () => {
      
      it('if the game obj is incomplete the status code should be 422', async () => {
        
      });

      it('should return 200 when adding a game obj', async () => {
        
      });

      it('sending a correct game object should return 200', async () => {
        
      });

    });

    describe('get /games', () => {

      it('getting all games should return status code 200', async () => {
        
      });

      it('should return array', async () => {
        
      });


    });
  });
});