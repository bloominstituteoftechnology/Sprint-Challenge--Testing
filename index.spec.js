const request = require("supertest");

const server = require("./api/server.js");

describe("server.js", () => {
  describe("get", () => {
    it("should return status code 201 if server is up", async () => {
      let response = await request(server).get("/games");
      expect(response.status).toBe(201);
    });
    it("should return 500 if server is down", async () => {
      let response = await request(server).get("/games");
      expect(response.status).toBe(500);
    });
    it("should return an array of jsons", async () => {
      let response = await request(server).get("/games");
      expect(response.type).toBe("application/json");
    });
  });
  describe("post", () => {
    it("should return status code 201", async () => {
      let response = await request(server)
        .post("/games")
        .send({ title: "pokemon blue", genre: "rpg", releaseYear: "1997" });
      expect(response.status).toBe(201);
    });

    it("should return status code 422", async () => {
        let response = await request(server)
          .post("/games")
          .send({ title: "pokemon red", releaseYear: "1997" });
        expect(response.status).toBe(422);
      });
    
      it("should return an id", async () => {
        let response = await request(server)
          .post("/games")
          .send({ title: "pokemon green", genre: "rpg", releaseYear: "1997" });
        expect(response.body).toEqual([4]);
      });
  });
});
