const server = require("./server.js");
const request = require("supertest");
 
describe("test API endpoints", () => {
  
  // GET tests
  it('successful get sends back status code 200', async () => {
    const response = await request(server).get('/api/games');
      expect(response.status).toBe(200);
  });
  it('get request should receive an array', async () => {
    const response = await request(server).get('/api/games');
      expect(response.body).toEqual(expect.arrayContaining([]));
  });
  it('get should return in the form of json', async () => {
    const response = await request(server).get('/api/games');
      expect(response.type).toBe('application/json');
  });

  // POST tests
  it("should add game", async () => {
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
  it("should return status code 200 if successful", async () => {
    const title = "Grand Theft Auto V";
    const genre = "Action-Adventure";
    const releaseYear = 2013;
     const response = await request(server)
      .post("/api/games")
      .send({ title, genre, releaseYear });
     expect(response.status).toEqual(200);
  });
  it("should return status code 422 if malformed data posted", async () => {
    const response = await request(server).post("/api/games");
     expect(response.status).toEqual(422);
  });
  it("should return JSON format", async () => {
    const response = await request(server).post("/api/games");
     expect(response.type).toBe("application/json");
  });
  /////

  // // DELETE tests 
  // it("DELETE should return 202 status code", async () => {
  //   const response = await request(server).delete("/api/todos/1");
  //   expect(response.status).toBe(202);
  // });
  // it("DELETE should return JSON", async () => {
  //   const response = await request(server).delete("/api/todos/1");
  //   expect(response.type).toEqual("application/json");
  // });
  // // Third test

});