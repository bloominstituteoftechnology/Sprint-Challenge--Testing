const request = require("supertest");
const server = require("./api/server.js");

describe("server", () => {
  describe("GET /games", () => {
    it("should return status code 200(OK)", async () => {
      const response = await request(server).get("/games");
      expect(response.status).toBe(200);
    });

    it("should return a JSON object", async () => {
      const response = await request(server).get("/games");
      expect(response.type).toBe("application/json");
    });

    it("should initially return an empty array", async () => {
      const response = await request(server).get("/games");
      expect(response.body).toEqual([]);
    });
  });

  describe("POST /games", () => {
    it("should add new entry to the database", async () => {
      const response = await request(server)
        .post(`/games`)
        .send({ title: "Super Mario Brothers", genre: "Classic" });
      expect(response.body).toBeTruthy();
    });

    it("should return status of 201", () => {
      return request(server)
        .post(`/games`)
        .send({ title: "Street Fighter", genre: "Classic" })
        .then(res => {
          expect(res.status).toEqual(201);
        });
    });

    it("should status of 422 if request incomplete", async () => {
      const response = await request(server)
        .post(`/games`)
        .send({ title: "Donkey Kong" });
      expect(response.status).toBe(422);
    });

    //     it("should return a status of 500 if bad request", async () => {
    //       const response = await request(server)
    //         .post(`/games`)
    //         .send({ title: "Donkey Kong" });
    //       expect(response.status).toBe(500);
    //     });
  });

  describe("DELETE /games/:id", () => {
    it("should return response code of 200 upon delete", async () => {
      const id = 1;
      const response = await request(server)
        .delete(`/games/${id}`)
        .send({ id });
      expect(response.status).toEqual(200);
    });

    it("should return response code of 404 if i.d. is not present", async () => {
      const id = 400;
      const response = await request(server)
        .delete(`/games/${id}`)
        .send({ id });
      expect(response.status).toEqual(404);
    });

    it("should return error message if i.d. is not present", async () => {
      const id = 432;
      const response = await request(server)
        .delete(`/games/${id}`)
        .send({ id });
      expect(response.body).toEqual({
        message: "There are no games with the specified i.d."
      });
    });
  });
});
