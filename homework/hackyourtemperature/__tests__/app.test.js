import supertest from "supertest";
import app from "../app.js";

const request = supertest(app);

describe("POST /weather", () => {
  it("should return city and temprature", async () => {
    const res = await request.post("/weather").send({ cityName: "London" }).expect(200);
    expect(res.text != null).toBe(true);
    const data = JSON.parse(res.text);
    expect(data.cityName).toBe("London");
  });

  it("Should return status 404 if city name doesn't exist", async () => {
    const response = await request.post("/weather").send({});
    expect(response.status).toBe(404);
  });
});
