const request = require("supertest");

const {server, db} = require("./server.js");

describe('server.js', () => {
    describe('root endpoint(/)', () => {
        it('should return status code 200 OK', async () => {
            const expected = 200;
            const res = await request(server).get('/');
            expect(res.status).toBe(expected)
        })

        it("should return JSON", async () => {
            const res = await request(server).get("/");
            expect(res.type).toEqual("application/json");
          });
      
          it("should return object that looks like {api:running} ", async () => {
            const expected = { api: "running" };
            const res = await request(server).get("/");
            expect(res.body).toEqual(expected);
          });
    })
})

