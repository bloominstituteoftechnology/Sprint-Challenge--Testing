const request = require("supertest");

const { server, db } = require("./server.js");

describe("server.js", () => {
  describe("root endpoint(/)", () => {
    it("should return status code 200 OK", async () => {
      const expected = 200;
      const res = await request(server).get("/");
      expect(res.status).toBe(expected);
    });

    it("should return JSON", async () => {
      const res = await request(server).get("/");
      expect(res.type).toEqual("application/json");
    });

    it("should return object that looks like {api:running} ", async () => {
      const expected = { api: "running" };
      const res = await request(server).get("/");
      expect(res.body).toEqual(expected);
    });
  });

  describe("GET endpoint (/games)", () => {
    it("should return status code 200 OK", async () => {
      const expected = 200;
      const res = await request(server).get("/games");
      expect(res.status).toEqual(expected);
    });

    it("should return JSON", async () => {
      const res = await request(server).get("/games");
      expect(res.type).toEqual("application/json");
    });

    it("should return object that looks like expected ", async () => {
      //Will return an empty array if there are no games stored.
      // To test this, comment out all games in server.js
      const expected = db.games;
      const res = await request(server).get("/games");
      expect(res.body).toEqual(expected);
    });
  });

  describe("POST endpoint(/games)", () => {
    it("should return status code 201 created if successful", async () => {
      const expected = 201;
      const res = await request(server)
        .post("/games")
        .send({
          title: "Pacman", // required
          genre: "Arcade", // required
          releaseYear: 1980 // not required
        });
      expect(res.status).toEqual(expected);
    });

    it("should return JSON", async () => {
      const res = await request(server).get("/games");
      expect(res.type).toEqual("application/json");
    });

    it("should return created game", async () => {
      const expected = {
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      };

      const res = await request(server)
        .post("/games")
        .send({
          title: "Pacman",
          genre: "Arcade",
          releaseYear: 1980
        });
      expect(res.body).toEqual(expected);
    });

    it("should return status code 422 if there is no title or genre provided", async () => {
      const expected = 422;
      const res = await request(server)
        .post("/games")
        .send({
          title: "Pacman",
          genre: "",
          releaseYear: 1980
        });

      expect(res.status).toEqual(expected);
      expect(res.body).toEqual({ message: `need title and genre bro` });
    });

    //STRETCH TASK
    it("should return status code 405 and message if duplicate game", async () => {
      const expected = 405;
      const res = await request(server)
        .post("/games")
        .send({
          title: "Monopoly",
          genre: "board",
          releaseYear: 1945
        });

      expect(res.status).toEqual(expected);
      expect(res.body).toEqual({ message: "That game is already in database" });

    });
  });
});
