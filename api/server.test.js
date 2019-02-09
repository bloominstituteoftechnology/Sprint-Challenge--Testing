const request = require("supertest");
const server = require("./server.js");
const db = require("../data/dbConfig.js")

describe("the route handlers", () => {
   describe("get /", () => {
      it("responds with 200", async () => {
         const response = await request(server).get("/");

         expect(response.status).toBe(200);
      });
      it("responds with json", async () => {
         const response = await request(server).get("/");

         expect(response.type).toMatch(/json/i);
      });
      it("sends correct response", async () => {
         const response = await request(server).get("/");

         expect(response.body).toEqual({api: "up and running"});
      });
   });
   describe("get /games", () => {
      it("responds with 200", async () => {
         const response = await request(server).get("/games");

         expect(response.status).toBe(200);
      });
      it("responds with json", async () => {
         const response = await request(server).get("/games");

         expect(response.type).toMatch(/json/i);
      });
      it("sends correct response", async () => {
         const response = await request(server).get("/games");

         expect(response.body).toEqual([{
                 "genre": "Racing",
                 "id": 1,
                 "release_year": 1995,
                 "title": "Mario Kart",
               },
               {
                 "genre": "Fighting",
                 "id": 2,
                 "release_year": 1996,
                 "title": "Mortal Kombat",
               },
               {
                 "genre": "Fighting",
                 "id": 3,
                 "release_year": 1997,
                 "title": "Teken",
               },
        ]);
      });
   });
});