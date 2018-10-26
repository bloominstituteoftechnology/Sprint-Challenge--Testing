const server = require("./server.js");
const request = require("supertest");
 
describe("test API endpoints", () => {
  
  // GET tests
  it('**GET**: successful GET sends back status code 200', async () => {
    const response = await request(server).get('/api/games');
      expect(response.status).toBe(200);
  });
  it('**GET**: GET request should return an array', async () => {
    const response = await request(server).get('/api/games');
      expect(response.body).toEqual(expect.arrayContaining([]));
  });
  it('**GET**: GET response should be in json format', async () => {
    const response = await request(server).get('/api/games');
      expect(response.type).toBe('application/json');
  });

  // POST tests
  it("**POST**: should add game with correct body formatting", async () => {
    const title = "Grand Theft Auto V";
    const genre = "Action-Adventure";
    const releaseYear = 2013;
     
    const expected = { 
      title: "Grand Theft Auto V", 
      genre: "Action-Adventure", 
      releaseYear: 2013 
    };
    const response = await request(server)
      .post("/api/games")
      .send({ title, genre, releaseYear });
     expect(response.body).toEqual(expected);
  });
  it("**POST**: should return status code 200 if successful", async () => {
    const title = "Grand Theft Auto V";
    const genre = "Action-Adventure";
    const releaseYear = 2013;
    const response = await request(server)
      .post("/api/games")
      .send({ title, genre, releaseYear });
    expect(response.status).toEqual(200);
  });
  it("**POST**: should return status code 422 if malformed data posted", async () => {
    const response = await request(server).post("/api/games");
     expect(response.status).toEqual(422);
  });
  it("**POST**: should return JSON format", async () => {
    const response = await request(server).post("/api/games");
     expect(response.type).toBe("application/json");
  });
  /////

  // DELETE tests 
  it("**DELETE**: should delete respective game matching correct id", async () => {
    const id = 0;
    const expected = { gameDeleted: `${id}` };
    const response = await request(server).delete(`/api/games/${id}`);
    expect(response.body).toEqual(expected);
  });
  it("**DELETE**: delete endpoint should return status code 200 if successful", async () => {
    const id = 0;
    const response = await request(server).delete(`/api/games/${id}`);
     expect(response.status).toBe(200);
  });
  it("**DELETE**: delete endpoint should return JSON format", async () => {
    const id = 0;
    const response = await request(server).delete(`/api/games/${id}`);
     expect(response.type).toBe("application/json");
  });
  //////

});