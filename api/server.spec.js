const request = require("supertest");

const server = require("./server");
const db = require("../data/dbConfig.js");

describe("server.js", () => {
  it("should return a 200 on the basic route", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
  });
});

describe('get/games', () => {
    it('should return an array of objects', async () => {
        const res = await request(server).get('/games');
        expect(res.status).toBe(200);
        expect(res.text).toBeTruthy();
        expect(res.text).toContain([]);
    })
})
