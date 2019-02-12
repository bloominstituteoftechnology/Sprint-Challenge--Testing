const db = require("../data/dbConfig");
const request = require("supertest");
const server = require("./server");

afterEach(async () => {
  await db("games").truncate();
});

describe("the route handler", () => {

        // 3 Tests per endpoint
    describe('get /games', () => {
        // The GET /games endpoint should return the list of games and HTTP status code 200.
        
        // Write a test to make sure this endpoint always returns an array, even if there are no games stored. If there are no 
        // games to return, the endpoint should return an empty array.

    it("responds with status 200", async () => {
      const response = await request(server).get("/games");
      expect(response.status).toBe(200);
    });
    it("responds with json", async () => {
      const response = await request(server).get("/games");
      expect(response.type).toMatch(/json/i);
    });
    it("sends the correct response object", async () => {
      const response = await request(server).get("/games");
      expect(response.body).toEqual([]);
    });
  });

// describe('get by ID', () => {
//     it('Success responds with 200', async () => {
//         const success = await request(server).get('/games/:2');
//         console.log('Games 2', success);
//         expect(success.status).toBe(200);
//     });
    
//     // Write a GET /games/:id endpoint that returns the information about a single game. 
//     it('sends correct response to request', async () => {
//         const success = await request(server).get('/games/:1');
//         expect(success.body.id).toEqual(1);
//         expect(success.body.title).toEqual('Monoply');
//         expect(success.body.genre).toEqual('Board');
//         expect(success.body.releaseYear).toEqual(1980);
//     });

//     // Respond with a 404 status code when a game is not found for the provided id. Add the corresponding tests for it.
//     it('responds with 404 if game not found by id', async () => {
//         const failed = await request(server).get('/games:8');
//         expect(failed.status).toBe(404);
//     });
// });

  describe("post /games", () => {
    it('responds with 201 when it works', async () => {
        const game1 = {
            title: 'Game 1',
            genre: 'Best Game Ever',
            releaseYear: 2050
        };

        const success = await request(server).post('/games').send(game1);
        expect(success.status).toBe(201);
    });

    it("respods with 422 when title is missing", async () => {
      const body = { title: "", genre: "RPG", releaseYear: 2002 };
      const response = await request(server)
        .post("/games")
        .send(body);
      expect(response.status).toBe(422);
    });
    it("respods with 422 when genre is missing", async () => {
      const body = { title: "Kingdom Hearts", releaseYear: 2002 };
      const response = await request(server)
        .post("/games")
        .send(body);
      expect(response.status).toBe(422);
    });
  });


  //     describe('Delete by ID', () => {
//         it('responds with 200 when successful', async () => {
//             const success = await request(server).delete('/3');
//             expect(response.status).toBe(200);
//         });

//         it('sends proper response', async () => {
//             const success = await request(server).delete('/3')

//             expect(success.body.id).toEqual(3);
//             expect(success.body.title).toEqual('Risk');
//             expect(success.body.genre).toEqual('Board');
//         });

//         it('responds with 404 on failure', async() => {
//             const failed = await request(server).delete('8');
//             expect(failed.status).toBe(404);
//         });
//     });
});