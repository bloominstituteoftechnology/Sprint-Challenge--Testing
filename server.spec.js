const request = require("supertest");

const server = require("./server.js");

describe("server.js", () => {
  describe("GET: unknown endpoint (/???)", () => {
    it("should return status code 404 file not found", async () => {
      const expected = 404;
      const res = await request(server).get("/notgames");
      expect(res.status).toEqual(expected);
    });
  });

  describe("GET: (/games)", () => {
    it("should return status code 200", async () => {
      const expected = 200;
      const res = await request(server).get("/games");
      expect(res.status).toEqual(expected);
    });

    it("should return a list of games", () => {
      const expected = [
        {
          "title": "Pacman",
          "genre": "Arcade",
          "releaseYear": "1980"
        }
      ];
      const res = await request(server).get("/games");
      expect(res.text).toEqual(expected);
    });
  });

  describe("POST: (/games)", () => {
      it("should return status code 200 ok when correct data is provided", async () => {
          const expected = 200;
          const res = await request(server).post('/games').send({
              title: "Borderlands 2",
              genre: "Looter-Shooter",
              releaseYear: "2012"
          })
          expect(res.status).toEqual(expected);
      })

      it("should return the new games array when correct data is provided", async () => {
        const expected = [{
            "title": "Pacman",
            "genre": "Arcade",
            "releaseYear": "1980"
          },
          {
            "title": "Borderlands 2",
            "genre": "Looter-Shooter",
            "releaseYear": "2012"
        },
        {
            "title": "Warframe",
            "genre": "Looter-Shooter",
            "releaseYear": "2013"
        }
        ]
        const res = await request(server).post("/games").send({
            title: "Warframe",
            genre: "Looter-Shooter",
            releaseYear: "2013"
        })
        expect(res.text).toEqual(expected);
      })

      it("should return status code 422 when incomplete data is passed", async () => {
          const expected = 422;
          const res = await request(server).post("/games").send({title:"Borderlands 2"});
          expect(res.status).toEqual(expected);
      })

      it("should return appropriate error message when incomplete data is passed", async () => {
        const expected = '{"Error":"Game Over Man! A game needs a title and genre to enter the database"}';
        const res = await request(server).post("/games").send({title:"Borderlands 2"});
        expect(res.status).toEqual(expected);
      })
  })
});
