import supertest from "supertest";

const request = supertest("http://localhost:3000");

describe("POST /", () => {
  it("Quick test", async () => {
    const res = await request.post("/weather").send({ cityName: "London" }).expect(200);
    expect(res.text != null).toBe(true);
    const data = JSON.parse(res.text);
    expect(data.cityName).toBe("London");
  });
});
