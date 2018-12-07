const request = require("supertest");
const server = require("./server.js");

describe("SERVER", () => {
  describe("POST", () => {
    it("Should allow you to run tests", async () => {
      const response = await request(server).post("/games");

      expect(response).toBeTruthy();
    });

    it("Should return 201 status code if game added", async () => {
      const response = await request(server)
        .post("/games")
        .send({ title: "Pacman", genre: "Arcade", year: 1980 });

      expect(response.status).toBe(201);
      expect(response.text).toBe("Pacman added to game database");
    });

    it("Should return 422 if required game fields are missing", async () => {
      const response = await request(server)
        .post("/games")
        .send({ name: "A Game" });

      expect(response.status).toBe(422);
      expect(response.text).toBe("Required game fields missing");
    });

    it("Should return status code 405 if game already exists ", async () => {
      const response = await request(server)
        .post("/games")
        .send({ title: "madden", genre: "console", year: "every" });

      expect(response.status).toBe(405);
      expect(response.text).toBe("Game is already in database");
    });
  });

  describe("GET", () => {
    it("Should allow you to run tests", async () => {
      const response = await request(server).get("/games");

      expect(response).toBeTruthy();
    });

    it("Should return games array, even if array is empty", async () => {
      const response = await request(server).get("/games");

      expect(response.type).toBe("application/json");
    });

    it("Should return status code 200 if request was successful", async () => {
      const response = await request(server).get("/games");

      expect(response.status).toBe(200);
    });
  });

  describe("DELETE", () => {
    it("Should be able to run tests", async () => {
      const response = await request(server).delete("/games/:id");

      expect(response).toBeTruthy();
    });

    it("Should return 200 if game with that id exists", async () => {
      const response = await request(server)
        .delete("/games/:id")
        .send({ id: 2 });

      expect(response.status).toBe(200);
    });

    it("Should return 404 if no game exists with that id", async () => {
      const response = await request(server)
        .delete("/games/:id")
        .send({ id: 100 });

      expect(response.status).toBe(404);
    });
  });

     
  // it.only("Return game with matching ID", async () => {
  //   const response = await request(server)
  //     .get("/games/:id")
  //     .send({ id: 1 }); 

  //   expect(response.status).toBe(200);
  // });
});
